import Toast from "./Toast"
import { FC } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"

import Layout from "@/components/layout/Layout"
import SseNotif from "@/components/screens/notification/SseNotif"

import { store } from "@/store/store"
import IChildren from "@/utils/children.inteface"
import { BrowserRouter } from "react-router-dom"
import TabHeader from "./TabHeader"

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

const MainProvider: FC<IChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toast />
        <SseNotif />
        <QueryClientProvider client={queryClient}>
          <Layout>{children}</Layout>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default MainProvider
