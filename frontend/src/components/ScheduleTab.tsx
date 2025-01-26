import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function ScheduleTab() {
    return (
      <div className="flex-1 bg-white block">
        <Tabs defaultValue="account" className="w-full sm:w-[400px] lg:w-[400px] lg:ml-80 lg:mt-12 lg:mt-10 mt-12 dark:bg-black">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Day 1</TabsTrigger>
            <TabsTrigger value="password">Day 2</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Schedule - Day 1</CardTitle>
                <CardDescription className="text-lg font-semibold text-gray-700 mt-2">
      <div className="flex flex-col space-y-1">
        <span className="text-sm text-black-500 text-left dark:text-white">9am - Start of event</span>
        <span className="text-sm text-black-500 text-left dark:text-white">5pm - End of event for day 1</span>
      </div>
    </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Schedule - Day 2</CardTitle>
                <CardDescription className="text-lg font-semibold text-gray-700 mt-2">
      <div className="flex flex-col space-y-1">
        <span className="text-sm text-black-500 text-left dark:text-white">9am - Start of event</span>
        <span className="text-sm text-black-500 text-left dark:text-white">5pm - End of event for day 2</span>
      </div>
    </CardDescription>
              </CardHeader>
              
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
  