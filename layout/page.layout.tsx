import { NextPage } from "next";
import Main from './main.layout'
import Dashboard from './dashboard.layout'

type pageMainLayout = NextPage & { layout: typeof Main }
type pageDashboardLayout = NextPage & { layout: typeof Dashboard }

type PageWithLayout = pageMainLayout | pageDashboardLayout

export default PageWithLayout