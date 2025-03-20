import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import './ExpenditureList.css';
import dayjs from 'dayjs';
import MenuFooter from "../components/MenuFooter";

const categories = [
    { id: 0, name: "전체", emoji: "🔍" }, // 전체 카테고리 추가
    { id: 1, name: "헬스케어", emoji: "🏃‍♂️‍➡️" },
    { id: 2, name: "홈/라이프", emoji: "🏠" },
    { id: 3, name: "게임", emoji: "🎮" },
    { id: 4, name: "IT", emoji: "💻" },
    { id: 5, name: "식품", emoji: "🍽️" },
    { id: 6, name: "자기개발", emoji: "🛠️" },
    { id: 7, name: "뷰티", emoji: "💄" },
    { id: 8, name: "영상", emoji: "🎥" },
    { id: 9, name: "음악", emoji: "🎵" },
    { id: 10, name: "도서", emoji: "📚" },
  ];


const ExpenditureList = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [expenditures, setExpenditures] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [categoryId, setCategoryId] = useState(null);
    const [cursorId, setCursorId] = useState(null);  // 🔹 마지막 소비 내역 ID
    const [hasNext, setHasNext] = useState(true); // 🔹 다음 데이터 존재 여부
    const [isFetching, setIsFetching] = useState(false); // 🔹 데이터 로딩 중 여부
    const [open, setOpen] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const anchorRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(dayjs()); // 선택한 날짜 상태 추가
    
    const handleApplyDate = () => {
        setCurrentMonth(selectedDate.toDate()); // 선택한 날짜를 currentMonth에 반영
        setShowDatePicker(false);
    };
    
    // 🔹 소비 내역 불러오기 (무한 스크롤 적용)
    const fetchExpenditureData = useCallback(async (date, isLoadMore) => {
      // 이미 데이터를 가져오는 중이면 중복 요청 방지
      if (isFetching) {
        console.log("🚫 이미 데이터를 가져오는 중입니다.");
        return;
      }
      
      // 추가 로드가 아니고, 다음 데이터가 없는 경우 (페이지네이션의 끝)
      if (!isLoadMore && !hasNext && cursorId !== null) {
        console.log("🚫 더 이상 가져올 데이터가 없습니다.");
        return;
      }
      
      setIsFetching(true);
    
      const startDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-01`;
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      const endDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${lastDay}`;
    
      // ✅ categoryId가 0이면 null로 변환
      const requestCategoryId = categoryId === 0 ? null : categoryId;
    
      // ✅ 첫 요청일 때 cursorId를 null로 변경
      const requestCursorId = isLoadMore ? cursorId : null;
    
      console.log(`📢 API 요청 - cursorId: ${requestCursorId}, isLoadMore: ${isLoadMore}`);
      console.log("요청 데이터:", { startDate, endDate, requestCategoryId });
    
      try {
        const response = await axios.post('http://localhost:8090/api/v1/expenditure/list', {
          cursorId: requestCursorId,
          startDate,
          endDate,
          categoryId: requestCategoryId,
          size: 10,
        });
    
        console.log("📌 API 응답 데이터:", response.data);
    
        setExpenditures((prev) => isLoadMore ? [...prev, ...response.data.expenditures] : response.data.expenditures);
        setTotalExpense(response.data.totalExpense);
        setTotalIncome(response.data.totalIncome);
        setCursorId(response.data.nextCursor);
        setHasNext(response.data.hasNext);
    
      } catch (error) {
        console.error('❌ 소비 내역을 불러오는데 실패했습니다.', error);
      } finally {
        setIsFetching(false);
      }
    }, [cursorId, isFetching, hasNext, categoryId]);
    
    // 🔹 스크롤 이벤트 감지 (무한 스크롤)
    useEffect(() => {
      const handleScroll = () => {
        // 스크롤이 페이지 하단에 가까워지면 추가 데이터 로드
        if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100) {
          if (hasNext && !isFetching) {
            console.log("🔹 데이터 로드 조건 충족!");
            fetchExpenditureData(currentMonth, true);
          }
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchExpenditureData, hasNext, isFetching]);
  
    const handleNextMonth = () => {
      const nextMonth = new Date(currentMonth);
      nextMonth.setMonth(currentMonth.getMonth() + 1);
      setCurrentMonth(nextMonth);
    };
  
    const handlePrevMonth = () => {
      const prevMonth = new Date(currentMonth);
      prevMonth.setMonth(currentMonth.getMonth() - 1);
      setCurrentMonth(prevMonth);
    };
  
    // 🔹 컴포넌트 마운트 또는 월/카테고리 변경 시 데이터 로드
    useEffect(() => {
      // 월이나 카테고리가 변경되면 상태 초기화하고 새 데이터 요청
      console.log("📅 월/카테고리 변경 감지! 새로운 데이터 요청:", currentMonth);
      setExpenditures([]);  // 리스트 초기화
      setCursorId(null);    // 첫 요청이므로 cursorId 초기화
      setHasNext(true);     // 새로운 요청을 위해 hasNext 초기화
      setIsFetching(true);  // 로딩 상태 활성화
      
      // fetchExpenditureData 대신 직접 API 호출
      const loadInitialData = async () => {
        const startDate = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-01`;
        const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const endDate = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${lastDay}`;
        
        const requestCategoryId = categoryId === 0 ? null : categoryId;
        
        try {
          const response = await axios.post('http://localhost:8090/api/v1/expenditure/list', {
            cursorId: null,
            startDate,
            endDate,
            categoryId: requestCategoryId,
            size: 10,
          });
          
          console.log("📌 초기 데이터 응답:", response.data);
          
          setExpenditures(response.data.expenditures);
          setTotalExpense(response.data.totalExpense);
          setTotalIncome(response.data.totalIncome);
          setCursorId(response.data.nextCursor);
          setHasNext(response.data.hasNext);
        } catch (error) {
          console.error('❌ 소비 내역을 불러오는데 실패했습니다.', error);
        } finally {
          setIsFetching(false);
        }
      };
      
      loadInitialData();
    }, [currentMonth, categoryId]);
  
    const handleCategorySelect = (event, index) => {
      setCategoryId(categories[index].id);
      setOpen(false);
    };
  
    return (
    <>
      <div className="expenditure-list">
        <header>
          <h2 onClick={() => setShowDatePicker(true)}>
          <button onClick={handlePrevMonth}>&lt;</button> {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월 <button onClick={handleNextMonth}>&gt;</button>
          </h2>
        </header>
  
        <div className="summary">
          <p>지출 <strong className="income">{totalIncome.toLocaleString()}원</strong></p>
        </div>
  
        <div className="toggle-bar">
          <ButtonGroup variant="contained" ref={anchorRef}>
            <Button>{categories.find(cat => cat.id === categoryId)?.name || '전체 내역'}</Button>
            <Button size="small" onClick={() => setOpen(prev => !prev)}>
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
            {({ TransitionProps }) => (
              <Grow {...TransitionProps}>
                <Paper>
                  <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <MenuList>
                      {categories.map((category, index) => (
                        <MenuItem key={index} onClick={(event) => handleCategorySelect(event, index)}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
  
        <ul className="expenditure-items">
          {expenditures.length > 0 ? (
            expenditures.map((item) => (
              <li key={item.id}>
                <div>{item.date.join('-')}</div>
                <div>{item.description}</div>
                <div>{item.amount.toLocaleString()}원</div>
              </li>
            ))
          ) : !isFetching && (
            <li className="no-data">데이터가 없습니다.</li>
          )}
        </ul>
  
        {/* 로딩 표시 */}
        {isFetching && <p className="loading-text">데이터를 불러오는 중...</p>}
  
        

         
      </div>
      <MenuFooter />
    </>
    );
  };
  
  export default ExpenditureList;