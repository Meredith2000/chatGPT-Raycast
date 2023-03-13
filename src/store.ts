import {LocalStorage} from "@raycast/api";
import {ChatItem, ChatCollection} from "../index";

export const getAllChatHisTory = async ():Promise<ChatCollection[]> => {
  const res = await LocalStorage.getItem<string>('history')
  if (res){
    return JSON.parse(<string>res)
  }else {
    return []
  }
}

export const saveAllChatHistory = async (collections: ChatCollection[]) => {
  await LocalStorage.setItem('history', JSON.stringify(collections))
}

export const getChatCollection = async (id: string):Promise<ChatCollection> => {
  const all = await getAllChatHisTory()
  return all.filter(item => item.id === id)[0]
}

export const insetChatItem2Collection = async (id: string, item: ChatItem) => {
  const chatCollection = await getChatCollection(id)
  const all = await getAllChatHisTory()
  let newAll:ChatCollection[] = []
  if (chatCollection){
    chatCollection.chatItems.unshift(item)
    // 持久化
    newAll = all.map(item => item.id === id?chatCollection:item)
  }else {
    // 第一次插入
    newAll = all
    newAll.unshift({id, chatItems:[item]})
  }
  await saveAllChatHistory(newAll)
}
