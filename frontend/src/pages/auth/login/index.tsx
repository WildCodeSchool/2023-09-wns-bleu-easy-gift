//frontend/src/pages/auth/login.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputLogin, useLoginLazyQuery } from "@/graphql/generated/schema";
import Link from "next/link";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const [login, { data, error }] = useLoginLazyQuery({
    onCompleted: () => {
      router.push("/user");
    },
  });
  console.log(data, error);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as InputLogin;
    if (data.email && data.password) {
      await login({
        variables: { infos: { email: data.email, password: data.password } },
      });
    }
  };
  return (
    <div className="flex flex-col  justify-center  items-center w-full h-full ">
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          data-testid="login-email"
          id="email"
          type="email"
          name="email"
          placeholder="Indiquez votre email"
        />
        <Input
          data-testid="login-password"
          id="password"
          type="password"
          name="password"
          placeholder="Indiquez votre mot de passe"
        />
        <Button type="submit">{"Se connecter"}</Button>
        <Button variant={"link"}>
          <Link href={"/auth/register"}>Voulez vous creer un compte ?</Link>
        </Button>
      </form>
    </div>
  );
}

export default Login;
