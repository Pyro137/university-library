import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

const Home= async()=> {
  const user= await db.select().from(users).where(eq(users.universityId,"123"))
  console.log(user);
  return (
    <>
    <BookOverview {...sampleBooks[0]}/>

    <BookList title="Latest Books" books={sampleBooks} containerClassName="mt-28"/>
    </> 
  );
}
export default Home
