import Image from "next/image";

const bots = [
  {
    name: "Telegram",
    image: "/images/bots/moldovaCardTg.webp",
    nikname: "@mdcardbot",
    description:
      "Виртуальный кабинет участника программы «Карта гражданина Молдовы в РФ»",
    btnName: "Перейти в Telegram",
    link: "https://t.me/mdcardbot",
  },
  {
    name: "ВКонтакте",
    image: "/images/bots/moldovaCardVk.webp",
    nikname: "@moldovacard",
    description:
      "Добро пожаловать в официальную группу программы «Карта гражданина Молдовы в РФ»",
    btnName: "перейти в VK",
    link: "https://vk.com/moldovacard",
  },
];

export default function BotsPage() {
  return (
    <div>
      <div className="absolute inset-0 bg-[url('/images/main/rug-bg.webp')] bg-center blur-[9px]"></div>
      <div className="relative z-10 w-full h-[100vh] flex items-center flex-col sm:flex-row justify-center gap-[30px] lg:gap-[50px]">
        {bots.map((bot) => (
          <div
            key={bot.name}
            className="flex flex-col gap-[30px] p-[15px] lg:p-[30px] items-center justify-between max-w-[290px] lg:max-w-[380px] min-h-[400px] lg:min-h-[450px] bg-white rounded-[20px]"
          >
            <div className="flex flex-col items-center gap-[10px]">
              <h2 className="text-[20px] sm:text-[25px] font-semibold mb-[4px]">
                {bot.name}
              </h2>
              <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden">
                <Image
                  src={bot.image}
                  alt={bot.name}
                  fill
                  sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
                  className="object-cover"
                />
              </div>
              <p className="text-[#747474] font-semibold">{bot.nikname}</p>
            </div>

            <p className="text-sm lg:text-base text-center">
              {bot.description}
            </p>

            <a
              href={bot.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[18px] lg:text-[25px] leading-[30px] font-medium w-full"
            >
              <button className="w-full bg-[#FDB51B] px-[20px] py-[7px] lg:py-[10px] rounded-[10px] hover:bg-[#facc15] transition cursor-pointer ">
                {bot.btnName}
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
