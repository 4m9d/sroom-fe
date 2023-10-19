import SearchSVG from '@/public/icon/Search';
import SearchInput from '../../gnb/SearchInput';
import SectionHeading from '../../ui/SectionHeading';
import Button from '../../ui/button/Button';

const SEARCH_BUTTON_ID = 'main-search-button';

export default function MainSearchInput() {
  return (
    <section className='max-w-screen-xl px-4 py-10 mx-auto mt-10 lg:px-24'>
      <SectionHeading title='스룸이 찾아드릴게요' />
      <div className='flex items-center justify-center w-full h-20 gap-5 mx-auto'>
        <SearchInput
          submitButtonId={SEARCH_BUTTON_ID}
          className='h-16 px-10 border rounded-full shadow-md md:h-20 border-sroom-gray-400'
        />
        <Button
          id={SEARCH_BUTTON_ID}
          className='shrink-0 w-16 h-16 md:w-20 md:h-20 !rounded-full bg-sroom-brand fill-sroom-white shadow-md'
        >
          <SearchSVG />
        </Button>
      </div>
    </section>
  );
}
