import z, { string } from "zod";
export const SearchSchema = z.object({
  search: z.string().min(1, "Inserire un parametro per avviare la ricerca"),
});

export type SearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
export type Alert = {
  id: number;
  name: string;
  target: string;
  description: string;
  isTriggered: boolean;
};

export type ToggleAlertParams = {
  newFields: {description: string; target: string; isTriggered: boolean};
  setNewFields: React.Dispatch<React.SetStateAction<{description: string; target: string; isTriggered: boolean}>>;
  alert: Alert;
  setToggleTarget: React.Dispatch<React.SetStateAction<{[id: string]: boolean}>>;
}

export type Activity = {
  type: string;
  message: string;
  time: string;
  triggered: boolean;
  color: string;
};
  