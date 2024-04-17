import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface Payload {
  email: string;
}

const SECRET_KEY = process.env.SECRET_KEY || "";

export default async function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get("token");

  console.log("Middleware token", token);

  return await checkToken(token?.value, request);
}

export async function verify(token: string): Promise<Payload> {
  const { payload } = await jwtVerify<Payload>(
    token,
    new TextEncoder().encode(SECRET_KEY)
  );
  return payload;
}

async function checkToken(token: string | undefined, request: NextRequest) {
  let response: NextResponse<unknown>;
  if (!token) {
    if (request.nextUrl.pathname.startsWith("/user")) {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      response = NextResponse.next();
    }
    response.cookies.delete("email");
    return response;
  }

  try {
    const payload = await verify(token);

    if (payload.email) {
      response = NextResponse.next();

      response.cookies.set("email", payload.email);

      return response;
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } catch (err) {
    console.log("%c⧭", "color: #e50000", err);
    console.log("ERROR");
    if (request.nextUrl.pathname.startsWith("/auth/login")) {
      response = NextResponse.next();
    } else {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
    }
    response.cookies.delete("token"); //suppression du token s'il n'est pas valide (puisque l'on tombe dans le catch)

    return response;
  }
}

// export const config = {
//   matcher: "/:path*",
// };
