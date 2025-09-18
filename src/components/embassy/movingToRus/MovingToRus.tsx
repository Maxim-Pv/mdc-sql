import { CitizenCardForm } from "@/components/main/footer/citizenCardForm/CitizenCardForm";
import LegalStay from "./blocks/LegalStay";
import MoldovanCitizenCard from "./blocks/moldovanCitizenCard/MoldovanCitizenCard";
import MoldovanDiaspora from "./blocks/moldovanDiaspora/MoldovanDiaspora";

export default function MovingToRus() {
  return (
    <div className="w-full flex flex-col items-center gap-[50px] sm:gap-[70px]">
      <LegalStay />
      <MoldovanDiaspora />
      <MoldovanCitizenCard />
      <CitizenCardForm />
    </div>
  );
}
