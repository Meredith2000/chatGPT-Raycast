import {List} from "@raycast/api";
import {ChatCollection, ChatItem} from '../index'
import {useEffect, useState} from "react";
import {getAllChatHisTory} from './store'

export default function History() {

  const [chatHistory, setChatHistory] = useState<ChatCollection[]>([]);

  // onMount hook
  // 获取全部的记录
  useEffect(() => {
    const fetchAllChatItem = async () => {
      const res = await getAllChatHisTory()
      setChatHistory(res)
    }

    fetchAllChatItem()
  }, [])


  return (
    <List isShowingDetail>
      {
        chatHistory.map(item => {
          let content = ''
          for (const chatItem of item.chatItems) {
            const {ask, reply} = chatItem
            content += '\n' + '**You**'+ '\n\n' + ask + '\n\n' +'**chatGPT**' + '\n\n' + reply + '\n\n' + '------' + '\n'
          }

          return (
            <List.Item
              key={item.id}
              title={item.id}
              detail={
                <List.Item.Detail markdown={content} />
              }
            />
          )
        })
      }
    </List>
  );
}
