import { cn } from "cn"
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field"
import { Input } from "../../components/ui/input"
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../../components/ui/toast";
import { axiosInstants } from "../../instant";

interface Register {
  fullName: string,
  email: string,
  mobile: string,
  password: string
}

export function RegisterPage({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const navigate = useNavigate();

  const [userData, setUserData] = useState<Register>({
    fullName: "",
    email: "",
    mobile: "",
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
      axiosInstants.post("/auth/register", userData),
      {
        loading: "Creating Profile...",
        success: "User register successfully!",
        error: "Login failed. Please try again.",
      }
    );

    if (response.data) {
      navigate("/");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    }
  }
};

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Register to your account</CardTitle>
              <CardDescription>
                Enter your details below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      name="fullName"
                      value={userData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                    <Field>
                    <FieldLabel htmlFor="mobile">Mobile</FieldLabel>
                    <Input
                      id="mobile"
                      type="text"
                      placeholder="Enter your mobile no"
                      name="mobile"
                      value={userData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
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
                    <Button type="submit">Register</Button>
                    <FieldDescription className="text-center">
                      You have an account? <Link to="/">Sign in</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
