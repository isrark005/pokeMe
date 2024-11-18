import { Container } from "./Container";

type HeaderProps = {
  onListBtnClickCallBack: ()=> void;
  showList: boolean
}
export function Header({onListBtnClickCallBack, showList}: HeaderProps) {
  return (
    <div className="header  border-b ">
      <Container className="flex py-4 justify-between items-center">
        <>
          <h1 className="font-sans font-bold text-[22px]">PokeMe</h1>
          <button onClick={onListBtnClickCallBack} className="bg-primary text-[#fff] rounded-md px-4 py-2 hover:bg-primary/70 transition-all">
            {showList ? "Set Reminder" : "Show Reminder List"}
          </button>
        </>
      </Container>
    </div>
  );
}
