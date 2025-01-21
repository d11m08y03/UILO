import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-label";
import { TabsList } from "@radix-ui/react-tabs";
import { ArrowRight, Download } from "lucide-react";

const UploadCompanies = () => {
  return (
    <div className="flex justify-center items-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger value="upload-file">Upload File</TabsTrigger>
          <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
        </TabsList>
        <TabsContent value="upload-file">
          <Card>
            <CardHeader>
              <CardDescription>
                Add the company list here. Click next when you're done to view
                the details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input id="picture" type="file" />
              </div>
            </CardContent>
            <CardFooter className="flex space-x-5">
              <Button variant="outline">
                <Download /> Download Template
              </Button>
              <Button>
                <ArrowRight /> Next
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="confirmation">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UploadCompanies;
