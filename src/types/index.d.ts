export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  password: string;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
  is_module_boss: boolean;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
};
