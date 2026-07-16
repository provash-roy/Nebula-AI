export interface Message {
  id: string;

  role: "USER" | "AI";

  content: string;

  loading?: boolean;
}
