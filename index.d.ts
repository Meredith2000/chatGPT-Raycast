export interface Response {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: Usage;
  choices: ChoicesItem[];
}
interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  pre_token_count: number;
  pre_total: number;
  adjust_token_count: number;
  adjust_total: number;
  final_total: number;
}
interface ChoicesItem {
  message: Message;
  finish_reason: string;
  index: number;
}
interface Message {
  role: string;
  content: string;
}

export type FormValue = {
  ask: string;
};

export interface ChatItem{
  ask: string;
  reply: string;
}

export interface ChatCollection{
  id: string;
  chatItems: ChatItem[]
}

export interface Preferences {
  url: string;
  apiKey: string;
}
