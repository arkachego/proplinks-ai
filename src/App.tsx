
import { useState, useEffect } from "react";
import Building from './building.jpg';
import ChevronUp from "./chevron-up.svg";

const MAX_SCROLL_TOP = 500;

const App: React.FC = () => {

  const [ scrollTop, setScrollTop ] = useState<number>(0);
  const [ headerPad, setHeaderPad ] = useState<number>(16);
  const [ imageHeight, setImageHeight ] = useState<number>(414);

  const getNewScrollTop = (offset: number) => {
    let newScrollTop = offset;
    if (newScrollTop > MAX_SCROLL_TOP) {
      newScrollTop = MAX_SCROLL_TOP;
    }
    return newScrollTop;
  };

  const getNewHeaderPad = (offset: number) => {
    let newHeaderPad = 16;
    let remainingPixels = MAX_SCROLL_TOP - offset;
    if (remainingPixels < 16) {
      newHeaderPad = newHeaderPad + 16 - remainingPixels;
    }
    return newHeaderPad;
  };

  const getNewImageHeight = (offset: number) => {
    let newImageHeight = 414 - offset;
    if (newImageHeight < 328) {
      newImageHeight = 328;
    }
    else if (newImageHeight > 414) {
      newImageHeight = 414;
    }
    return newImageHeight;
  };

  const onScroll = (event: Event) => {
    const target = (event.target as HTMLElement);
    const newScrollTop = getNewScrollTop(target.scrollTop);
    const newHeaderPad = getNewHeaderPad(newScrollTop);
    const newImageHeight = getNewImageHeight(newScrollTop);

    setScrollTop(newScrollTop);
    setHeaderPad(newHeaderPad);
    setImageHeight(newImageHeight);
  };

  useEffect(() => {
    const element = document.getElementById('app-wrapper');
    element.addEventListener("scroll", onScroll);
    return () => {
      element.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div id='app-wrapper' className="w-[360px] h-[598px] bg-slate-300 flex flex-col relative overflow-y-auto">
      <div id='app-head' className="w-full pt-4 pb-2 z-20 fixed top-0" style={{ padding: `16px ${headerPad}px 8px ${headerPad}px` }}>
        <div className='w-full h-[130px] rounded-[20px] bg-[#A098CF] flex justify-center'>
          <div className="flex flex-col pt-4">
            <img width={72} height={72} className="mx-[32px]" src="/logo.png" alt="app-logo"/>
            <div className="text-2xl font-bold">PropLinks AI</div>
          </div>
        </div>
      </div>
      <div id='app-image' className="w-full px-4 z-30 fixed" style={{ top: 154 - (scrollTop > 380 ? scrollTop - 380 : 0) }}>
        <img style={{ height: imageHeight }} className="w-[328px] rounded-[20px]" src={Building} alt="building-image"/>
      </div>
      <div id='app-detail' className="w-full z-40 pt-[551px]">
        <div className="w-full p-4 rounded-[20px] flex flex-col bg-white opacity-90 border border-gray-300">
          {scrollTop === 0 ? (
            <div className="flex justify-center mt-[-6px] mb-[10px]">
              <img width={24} height={24} src={ChevronUp} className="m-auto" alt="expand-details"/>
            </div>
          ) : <p className="text-2xl font-bold pb-[16px]">Header</p>}
          <div className="h-[465px] overflow-y-auto">
            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Maecenas ut morbi ultricies sagittis dis turpis cubilia libero vitae. Sollicitudin volutpat orci interdum posuere ante purus; montes suspendisse potenti. Sed urna vulputate platea tellus posuere nunc. Class dictumst ullamcorper adipiscing id diam nullam eleifend sagittis viverra. Magnis semper tellus fusce taciti; adipiscing nec class habitasse. Sagittis eros risus ad; pretium proin auctor taciti. Fusce molestie massa in turpis est quis tristique potenti. Vitae dolor dolor inceptos cursus fusc ridiculus elit non vestibulum lobortis sem molestie nullam. Consectetur mauris tortor lobortis mi; tincidunt posuere elit. Purus duis litora vulputate eu, natoque ipsum turpis. Luctus diam inceptos molestie mus litora rutrum primis finibus. Mollis dapibus nec nostra est, massa mus. Iaculis mus proin euismod sagittis dapibus pretium.        </p>
            <p>Ligula id himenaeos praesent egestas, venenatis nisi varius maecenas at. Quam consectetur maecenas blandit tortor tristique duis etiam habitant magna. Dapibus tincidunt habitant porttitor, id pretium natoque scelerisque? Elit porttitor ornare eu tristique ridiculus cubilia sed efficitur et. Mus quam ipsum; purus montes finibus platea nam. Tincidunt suspendisse ligula primis magna, id montes cubilia interdum tellus. Curabitur risus maecenas vulputate pharetra risus facilisis eu volutpat dictum. Interdum nisl nostra lectus congue purus torquent.</p>
            <p>Mauris leo est non sit vitae sociosqu curabitur. Commodo potenti vivamus cubilia etiam mus fames nam. Iaculis urna fames non morbi vulputate. Sagittis nibh montes aptent facilisis ornare himenaeos. Nam fermentum hendrerit libero natoque pulvinar urna, scelerisque urna. Torquent sit fames imperdiet urna commodo sodales pharetra venenatis. Vivamus dolor mi mollis auctor egestas condimentum facilisi interdum. Sodales mi quis libero nisi sapien; conubia proin habitasse montes.</p>
            <p>Ultricies aptent finibus in in ultricies dolor per magna venenatis. Eros nisl sit, tortor inceptos ridiculus per. Lobortis commodo ullamcorper posuere posuere turpis. Cras finibus mi ultrices quam, convallis magnis feugiat lacinia. Congue hendrerit fusce risus euismod nostra; magnis finibus vulputate. Faucibus lobortis rhoncus tellus metus venenatis adipiscing. Hac proin integer platea vivamus, sapien morbi. Venenatis nibh leo aliquam morbi leo quis. Non dictum placerat netus dignissim semper vivamus tristique.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
