import { useRouter } from "next/router";
import { FETCH_USER_LOGGED_IN } from "../../../units/products/detail/ProductDetail.queries";
import {
  Wrapper,
  HeaderWrpper,
  HeaderLogo,
  HeaderLogo2,
  SearchWrapper,
  Search,
  SearchBtn,
  HomeBtn,
  WriteBtn,
  ChatBtn,
  MyPageBtn,
  IconBox,
  IconWrapper,
  Profile,
  CategoryBtn,
  Category,
  CategoryList,
  CategoryName,
  SearchBar,
  MenuWrapper,
  Menu,
  OpenSearchWrapper,
  SearchInput,
  SearchText,
  SearchBox,
} from "./LayoutHeader.styles";
import { GlobalContext } from "../../../../../pages/_app";
import { useContext, useState } from "react";
// import SearchBar01 from "../../searchBars/searchBar01";

export default function LayoutHeader() {
  const { setSearch, accessToken, setAccessToken }: any =
    useContext(GlobalContext);
  const [mySearch, setMySearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const onChangeSearch = (e: any) => {
    setMySearch(e.target.value);
  };
  // enter로 검색하기
  const onClickSearch = () => {
    //@ts-ignore
    if (window.event.keyCode === 13) {
      setSearch(mySearch);
      setOpenSearch((prev) => !prev);
      if (router.pathname === "/posh/home") return;
      router.push("/posh/home");
    }
  };

  const onClickOpenSearch = () => {
    setOpenSearch((prev) => !prev);
    console.log(openSearch);
  };

  function onClickMove(event: any) {
    router.push(event.currentTarget.id);
  }

  function onClickOpen() {
    setIsOpen((prev) => !prev);
  }

  function onClickCategory(event: any) {
    router.push(`/posh/${event.target.id}`);
    setIsOpen(false);
  }

  const onClickLogout = () => {
    localStorage.clear();
    setAccessToken("");
  };

  return (
    <Wrapper>
      <Category isOpen={isOpen}>
        <CategoryList isOpen={isOpen}>
          <CategoryName onClick={onClickCategory} id="top">
            Top
          </CategoryName>
          <CategoryName onClick={onClickCategory} id="bottom">
            Bottom
          </CategoryName>
          <CategoryName onClick={onClickCategory} id="shoes">
            Shoes
          </CategoryName>
          <CategoryName onClick={onClickCategory} id="bag">
            Bag
          </CategoryName>
          <CategoryName onClick={onClickCategory} id="acc">
            Acc
          </CategoryName>
        </CategoryList>
      </Category>
      <CategoryBtn onClick={onClickOpen} isOpen={isOpen}></CategoryBtn>
      <HeaderLogo2 onClick={onClickMove} id="/posh/home">
        POSH
      </HeaderLogo2>
      {/* <HeaderWrpper>
        <HeaderLogo onClick={onClickMove} id="/posh/home">
          POSH
        </HeaderLogo>
        <SearchWrapper></SearchWrapper>
        <IconWrapper>
          <SearchBar>
            <Search onChange={onChangeSearch} />
            <SearchBtn onClick={onClickSearch}></SearchBtn>
          </SearchBar>
          <IconBox onClick={onClickMove} id="/posh/home">
            <HomeBtn />
          </IconBox>
          <IconBox onClick={onClickMove} id="/posh/products/write">
            <WriteBtn />
          </IconBox>
          <IconBox onClick={onClickMove} id="/posh/user/chatList">
            <ChatBtn />
          </IconBox>
          {data?.fetchUserLoggedIn.picture ? (
            <IconBox style={{ marginLeft: "10px" }}>
              <Profile
                src={data?.fetchUserLoggedIn.picture}
                onClick={onClickMove}
                id="/posh/user/mypage"
              />
            </IconBox>
          ) : (
            <IconBox onClick={onClickMove} id="/posh/user/mypage">
              <MyPageBtn />
            </IconBox>
          )}
        </IconWrapper> */}
      {/* </HeaderWrpper> */}
      <MenuWrapper>
        <Menu>ABOUT</Menu>
        <Menu>BOARD</Menu>
        <Menu onClick={onClickOpenSearch}>SEARCH</Menu>
        <Menu onClick={onClickMove} id="/posh/products/write">
          SUBMIT
        </Menu>
        <Menu onClick={onClickMove} id="/posh/user/chatList">
          CHAT
        </Menu>
        <Menu onClick={onClickMove} id="/posh/user/mypage">
          MY PAGE
        </Menu>
        {!accessToken ? (
          <Menu onClick={onClickMove} id="/posh/accounts/login">
            LOGIN
          </Menu>
        ) : (
          <Menu onClick={onClickLogout} id="/posh/accounts/login">
            LOGOUT
          </Menu>
        )}
        <Menu onClick={onClickMove} id="/posh/accounts/signup">
          JOIN US
        </Menu>
      </MenuWrapper>
      {openSearch && (
        <OpenSearchWrapper onClick={onClickOpenSearch}>
          <SearchBox>
            <SearchInput
              autoFocus
              onChange={onChangeSearch}
              onKeyUp={onClickSearch}
            ></SearchInput>
            <SearchText>press enter to search</SearchText>
          </SearchBox>
        </OpenSearchWrapper>
      )}
    </Wrapper>
  );
}
