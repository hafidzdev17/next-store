import styles from "./Register.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setIsError("");

    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setIsError("Email is already registered!");
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>User Register Form</h1>
      {isError && <p className={styles.register__error}>{isError}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label
              htmlFor="email"
              className={styles.register__form__item__label}
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.register__form__item__input}
              placeholder="Alamat Email"
            />
            <br />
            <label
              htmlFor="name"
              className={styles.register__form__item__label}
            >
              Full Name:
            </label>
            <input
              type="text"
              name="fullname"
              id="name"
              className={styles.register__form__item__input}
              placeholder="Full Name"
            />
            <br />
            <label
              htmlFor="phone"
              className={styles.register__form__item__label}
            >
              Phone:
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className={styles.register__form__item__input}
              placeholder="Phone Number"
            />
            <br />
            <label
              htmlFor="password"
              className={styles.register__form__item__label}
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={styles.register__form__item__input}
              placeholder="Password "
            />
          </div>

          <button type="submit" className={styles.register__form__button}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className={styles.register__link}>
        Already have an account? <Link href="/auth/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterView;
