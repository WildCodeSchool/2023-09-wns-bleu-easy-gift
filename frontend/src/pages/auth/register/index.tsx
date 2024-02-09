import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterUserMutation } from "@/graphql/generated/schema";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();
  const [register, { data, error }] = useRegisterUserMutation({
    onCompleted: () => {
      router.push("/auth/login");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    register({
      variables: {
        data: {
          email: data.email as string,
          password: data.password as string,
          pseudo: data.pseudo as string,
        },
      },
    });
  };

  return (
    <div className="flex flex-col  justify-center  items-center w-full h-full ">
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={handleSubmit}
      >
        <Input type="text" name="pseudo" placeholder="Indiquez votre pseudo" />
        <Input type="email" name="email" placeholder="Indiquez votre email" />
        <Input
          type="password"
          name="password"
          placeholder="Indiquez votre mot de passe"
        />
        <Button type="submit">{"S'enregistrer"}</Button>
      </form>
    </div>
  );
}

export default Register;
