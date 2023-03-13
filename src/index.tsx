import {Form, ActionPanel, Action, showToast, Toast, Clipboard, LocalStorage} from "@raycast/api";
import {chat} from './chat-api'
import { useState } from "react";
import { getPreferenceValues } from "@raycast/api";
import {FormValue, ChatItem, Preferences, Message} from "../index";
import * as crypto from "crypto";
import {insetChatItem2Collection} from "./store";


const id = crypto.randomUUID()

export default function Command() {
  const [currentAsk, setCurrentAsk] = useState<string>('')
  const [chatItem, setChatItem] = useState<ChatItem>({ask: '', reply: ''})
  const preferences = getPreferenceValues<Preferences>();
  const [msgArr, setMsgArr] = useState<Message[]>([])


  async function handleSubmit(values: FormValue) {
    // 清空输入
    setCurrentAsk('')

    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Sending to chatGPT",
    });

    try{
      const ask = values.ask
      const newMsg = [...msgArr, {role: 'user', content: ask}]
      setMsgArr(newMsg)
      const res = await chat(newMsg, preferences.url, preferences.apiKey)
      const reply = res.choices[0].message.content
      // 复制到剪贴板
      // await Clipboard.copy(reply);
      // 保存到LocalStorage
      await insetChatItem2Collection(id, {ask, reply})
      setChatItem({ask, reply})
      // 设置toast成功
      toast.style = Toast.Style.Success;
      toast.title = "Success to chat and copy the answer";
    }catch (e){
      // 设置toast失败
      console.log(e);
      toast.style = Toast.Style.Failure;
      toast.title = "Fail to chat";
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="ask chatGPT" />
      <Form.TextArea id="ask" title="your prompt" placeholder="enter your prompt" value={currentAsk} onChange={setCurrentAsk} />
      <Form.Description text={`ask: ${chatItem.ask}\nreply: ${chatItem.reply}`}/>
    </Form>
  );
}
