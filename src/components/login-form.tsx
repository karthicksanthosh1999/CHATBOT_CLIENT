import { cn } from "cn"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "./ui/field"
import { Input } from "./ui/input"
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { axiosInstants } from "../instant";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "./ui/toast";

interface Login {
  email: string,
  password: string
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const navigate = useNavigate();

  const [userData, setUserData] = useState<Login>({
    email: "",
    password: ""
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
    const response = await toast.promise(
      axiosInstants.post("/auth/login", userData),
      {
        loading: "Logging in...",
        success: "User login successfully!",
        error: "Login failed. Please try again.",
      }
    );

    if (response.data.access_token) {
      cookieStore.set("access_token", response.data.access_token);
      navigate("/home");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    }
  }
};

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                    id="password" 
                    type="password" 
                    required 
                    name="password"
                    value={userData.password}
                    onChange={handleChange} 
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
