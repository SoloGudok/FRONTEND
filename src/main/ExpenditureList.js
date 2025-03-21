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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import './ExpenditureList.css';
import MenuFooter from "../components/MenuFooter";

// datepicker
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Transition for the bottom popup
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

// Day of week function
const getDayOfWeek = (date) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayIndex = new Date(date).getDay();
  return days[dayIndex];
};

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
    const [showDatePickerDialog, setShowDatePickerDialog] = useState(false);
    const anchorRef = useRef(null);
    
    // 현재 월을 기반으로 dayjs 객체 생성
    const [selectedDate, setSelectedDate] = useState(dayjs(currentMonth));
    // 추가: 현재 뷰 상태 (month 또는 year)
    const [datePickerView, setDatePickerView] = useState('month');
    
    // Group expenditures by date
    const groupedExpenditures = () => {
      const grouped = {};
      
      expenditures.forEach(item => {
        const dateKey = item.date.join('-');
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(item);
      });
      
      // Sort dates in descending order (newest first)
      return Object.keys(grouped)
        .sort((a, b) => new Date(b) - new Date(a))
        .map(date => ({
          date,
          items: grouped[date]
        }));
    };

    // Find category by ID
    const getCategoryById = (id) => {
      return categories.find(cat => cat.id === id) || { emoji: "🔍", name: "기타" };
    };
    
    // DatePicker에서 날짜가 변경될 때 호출
    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };
    
    // 날짜 선택 적용
    const handleApplyDate = () => {
        const newDate = selectedDate.toDate();
        setCurrentMonth(newDate);
        setShowDatePickerDialog(false);
        // 다이얼로그가 닫힐 때 뷰를 다시 month로 리셋
        setDatePickerView('month');
    };
    
    // 날짜 선택 취소
    const handleCancelDatePicker = () => {
        setSelectedDate(dayjs(currentMonth)); // 원래 값으로 복원
        setShowDatePickerDialog(false);
        // 다이얼로그가 닫힐 때 뷰를 다시 month로 리셋
        setDatePickerView('month');
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
  
    const handleNextMonth = (e) => {
      e.stopPropagation(); // 버튼 클릭이 상위 요소로 전파되지 않도록 방지
      const nextMonth = new Date(currentMonth);
      nextMonth.setMonth(currentMonth.getMonth() + 1);
      setCurrentMonth(nextMonth);
      setSelectedDate(dayjs(nextMonth));
    };
  
    const handlePrevMonth = (e) => {
      e.stopPropagation(); // 버튼 클릭이 상위 요소로 전파되지 않도록 방지
      const prevMonth = new Date(currentMonth);
      prevMonth.setMonth(currentMonth.getMonth() - 1);
      setCurrentMonth(prevMonth);
      setSelectedDate(dayjs(prevMonth));
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
    
    // 뷰 변경 핸들러 (month -> year)
    const handleViewChange = () => {
      setDatePickerView(datePickerView === 'month' ? 'year' : 'month');
    };
  
    return (
    <>
      <div className="expenditure-list">
        <header>
          <h2 className="month-display" onClick={() => setShowDatePickerDialog(true)}>
            <button onClick={handlePrevMonth} className="month-nav-btn">&lt;</button> 
            <span className="month-year-text">{currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월</span> 
            <button onClick={handleNextMonth} className="month-nav-btn">&gt;</button>
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
  
        <div className="expenditure-groups">
          {groupedExpenditures().length > 0 ? (
            groupedExpenditures().map((group) => {
              // Extract date components
              const dateParts = group.date.split('-');
              const dateObj = new Date(group.date);
              const dayOfWeek = getDayOfWeek(dateObj);
              
              return (
                <div key={group.date} className="date-group">
                  <div className="date-header">
                    <span className="date-day">{dateParts[2]}일 {dayOfWeek}요일</span>
                  </div>
                  <ul className="date-items">
                    {group.items.map((item) => {
                      const category = getCategoryById(item.categoryId);
                      const isAllCategory = categoryId === 0 || categoryId === null;
                      
                      return (
                        <li key={item.id} className="expenditure-item">
                          {/* 카테고리가 '전체'일 때만 아이콘 표시 */}
                          {isAllCategory && (
                            <div className="item-category">{category.emoji}</div>
                          )}
                          <div className="item-description" 
                            style={{ 
                              gridColumn: isAllCategory ? '2' : '1 / span 2',
                              paddingLeft: isAllCategory ? '10px' : '10px'
                            }}>
                            {item.description}
                          </div>
                          <div className="item-amount">{item.amount.toLocaleString()}원</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          ) : !isFetching && (
            <div className="no-data">데이터가 없습니다.</div>
          )}
        </div>
  
        {/* 로딩 표시 */}
        {isFetching && <p className="loading-text">데이터를 불러오는 중...</p>}
      </div>
      
      {/* 하단에서 올라오는 날짜 선택 Dialog */}
      <Dialog
        open={showDatePickerDialog}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        onClose={() => {
          setShowDatePickerDialog(false);
          setDatePickerView('month'); // 다이얼로그가 닫힐 때 뷰를 다시 month로 리셋
        }}
        PaperProps={{
          style: {
            margin: 0,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            bottom: 0,
            position: 'absolute',
            width: '100%'
          },
        }}
      >
        <DialogTitle>
          날짜 선택
          <Button 
            onClick={handleViewChange} 
            color="primary" 
            style={{ marginLeft: 10, fontSize: '0.75rem' }}
          >
            
          </Button>
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                view={datePickerView}
                openTo={datePickerView}
                views={['year', 'month']}
                value={selectedDate}
                onChange={handleDateChange}
                format="YYYY년 MM월"
                sx={{ width: '100%' }}
                onViewChange={(newView) => {
                  setDatePickerView(newView);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDatePicker}>취소</Button>
          <Button onClick={handleApplyDate} variant="contained" color="primary">
            적용
          </Button>
        </DialogActions>
      </Dialog>
      
      <MenuFooter />
    </>
    );
  };
  
  export default ExpenditureList;