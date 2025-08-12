import { CalendarPage } from "./components/pages/CalendarPage";
import { LoginLayout } from "./components/templates/LoginLayout";

export default function Home() {
  return (
    <>
      <LoginLayout />
      <div className="">
        <CalendarPage />
      </div>
    </>
  );
}
