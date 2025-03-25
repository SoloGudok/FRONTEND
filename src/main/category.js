import MenuFooter from "../components/MenuFooter";
import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles-category.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from "axios";



const categoryMap = {
  1: "헬스케어",
  2: "홈/라이프",
  3: "게임",
  4: "IT",
  5: "식품",
  6: "자기개발",
  7: "뷰티",
  8: "음악",
  9: "도서",
};

function Category() {
  const [expenditures, setExpenditures] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [selectedValue, setSelectedValue] = useState(1);
  const [loading, setLoading] = useState(false);
  const [chartLoading, setChartLoading] = useState(false); //chart값 추가
  const [date, setDate] = useState(new Date());
  const datePickerRef = useRef(null);

    // 차트 데이터를 저장할 state
    const [chartData, setChartData] = useState({
      userSubscriptionExpenditure: 0,
      userNonSubscriptionExpenditure: 0,
      avgSubscriptionExpenditure: 0,
      avgNonSubscriptionExpenditure: 0
    });
  

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 2).toISOString().split('T')[0];
  };

  const getLastDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString().split('T')[0];
  };

  const fetchExpenditures = async (categoryId) => {
    setLoading(true);
    try {
      const requestBody = {
        categoryId: categoryId,
        startDate: getFirstDayOfMonth(date),
        endDate: getLastDayOfMonth(date),
        // year: date.getFullYear(),
        // month: date.getMonth() + 1,
        size: expenditures.length || 100,
      };

      console.log("요청 데이터:", JSON.stringify(requestBody, null, 2));

      const response = await axios.post(process.env.REACT_APP_API_URL+"/api/v1/expenditure/list", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      console.log("응답 데이터:", data);

      setExpenditures(data.expenditures || []);
      setTotalIncome(data.totalIncome || 0);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 차트 데이터를 가져오는 함수
  const fetchChartData = async () => {
    setChartLoading(true);
    try {
      const requestBody = {
        categoryId: selectedValue,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        userId: 1 // 현재 로그인한 사용자 ID (실제로는 로그인 정보에서 가져와야 함)
      };

      console.log("차트 요청 데이터:", JSON.stringify(requestBody, null, 2));

      const response = await axios.post(process.env.REACT_APP_API_URL+"/api/v1/expenditure/chart", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      console.log("차트 응답 데이터:", data);

      setChartData({
        userSubscriptionExpenditure: data.userSubscriptionExpenditure || 0,
        userNonSubscriptionExpenditure: data.userNonSubscriptionExpenditure || 0,
        avgSubscriptionExpenditure: data.avgSubscriptionExpenditure || 0,
        avgNonSubscriptionExpenditure: data.avgNonSubscriptionExpenditure || 0
      });
    } catch (error) {
      console.error("차트 데이터 로드 실패:", error);
    } finally {
      setChartLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenditures(selectedValue);
    fetchChartData();
  }, [date, selectedValue]);

  const BarChart1 = () => {
    const data = {
      // labels: subScription_Labels,
      labels: ["나의 구독소비", "같은 연령대의 평균 구독소비"],
      datasets: [
        {
          label: '구독소비 비교',
          data: [chartData.userSubscriptionExpenditure, chartData.avgSubscriptionExpenditure],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: false,
      indexAxis: "y",
      borderRadius: 10,   //막대 그래프 둥글게
      plugins: {
        legend: {
          display: false // 레이블 숨기기
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.raw.toLocaleString()}원`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false // X축 그리드 숨기기
          },
          border: {
            display: false // X축 경계선 숨기기
          },
          ticks: {
            callback: function(value) {
              return value.toLocaleString() + '원';
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false // Y축 그리드 숨기기
          },
          ticks: {
            display: false // Y축 수치 숨기기
          },
          border: {
            display: false // Y축 경계선 숨기기
          }
        }
      }
    };
  
    const style = {
      position: "relative",
      // height: "100%",
      // width: "70%",
    }
  
    return <Bar data={data} options={options} style={style} />;
  }
  
  
  const BarChart2 = () => {
    const data = {
      labels: ["나의 일반소비", "평균 일반소비"],
      datasets: [
        {
          label: '일반소비 비교',
          data: [chartData.userNonSubscriptionExpenditure, chartData.avgNonSubscriptionExpenditure],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };


    const options = {
      responsive: false,
      indexAxis: "y",
      borderRadius: 10,   //막대 그래프 둥글게
      plugins: {
        legend: {
          display: false // 레이블 숨기기
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.raw.toLocaleString()}원`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false // X축 그리드 숨기기
          },
          border: {
            display: false // X축 경계선 숨기기
          },
          ticks: {
            callback: function(value) {
              return value.toLocaleString() + '원';
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false // Y축 그리드 숨기기
          },
          ticks: {
            display: false // Y축 수치 숨기기
          },
          border: {
            display: false // Y축 경계선 숨기기
          }
        }
      }
    };
  
    const style = {
      position: "relative"
    }
  
    return <Bar data={data} options={options} style={style} />;
  }

  return (
    <>
      <div id="category-container">
        <div id="category-row1">
          <h1 style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
            {/* 이전 달 버튼 */}
            <span onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}>
              《
            </span>

            {/* 현재 년월 표시 (클릭 시 달력 오픈) */}
            <span onClick={() => datePickerRef.current?.setOpen(true)}>
              {date.getFullYear()}년 {date.getMonth() + 1}월
            </span>

            {/* 다음 달 버튼 */}
            <span onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}>
              》
            </span>
          </h1>
          <DatePicker
            selected={date}
            onChange={(newDate) => setDate(newDate)}
            dateFormat="yyyy-MM"
            showMonthYearPicker
            disabled={loading}
            ref={datePickerRef}
            customInput={<div style={{ display: "none" }} />} // 인풋 필드 숨김
          />
        </div>
        <div id="category-row2">
          <div><h2> 지출 {totalIncome.toLocaleString()}원</h2></div>
          <div>
            <label>카테고리 선택: </label>
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(Number(e.target.value))}
              disabled={loading}
            >
              {Object.entries(categoryMap).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>

          </div>
        </div>
        <div id="category-row3">
          <div><h2>소비 내역</h2></div>
          <div>
            {loading && <p>로딩 중...</p>}
            {expenditures.length > 0 ? (
              Object.entries(
                expenditures.reduce((grouped, item) => {
                  const dateKey = new Date(item.date).toLocaleDateString("ko-KR", {
                    // year: "numeric",
                    // month: "long",
                    day: "numeric",
                  });

                  if (!grouped[dateKey]) {
                    grouped[dateKey] = [];
                  }
                  grouped[dateKey].push(item);
                  return grouped;
                }, {})
              ).map(([date, items]) => (
                <div key={date}>
                  <h3>{date}</h3>
                  <ul>
                    {items.map((item) => (
                      <li key={item.id} class="no-bullets Expenditure-cell">
                        <div class="Expenditure-name">{item.description}</div>
                        <div class="Expenditure-cost"> {item.amount.toLocaleString()}원</div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>소비 내역이 없습니다.</p>
            )}
          </div>
        </div>

        <div id="category-row4">
          <h3>송예진님과 비슷한 연령대의 평균 {categoryMap[selectedValue]} 소비</h3>

          {chartLoading ? (
            <p>차트 로딩 중...</p>
          ) : (
            <>
              <div className="charts-cell">
                <div>구독소비</div>
                <div className="charts">
                  <BarChart1 />
                </div>
                <div className="charts-summary">
                  {/* <p>나의 구독소비: {chartData.userSubscriptionExpenditure.toLocaleString()}원</p>
                  <p>평균 구독소비: {chartData.avgSubscriptionExpenditure.toLocaleString()}원</p> */}
                </div>
              </div>

              <div className="charts-cell">
                <div>구독 외 소비</div>
                <div className="charts">
                  <BarChart2 />
                </div>
                <div className="charts-summary">
                  {/* <p>나의 일반소비: {chartData.userNonSubscriptionExpenditure.toLocaleString()}원</p>
                  <p>평균 일반소비: {chartData.avgNonSubscriptionExpenditure.toLocaleString()}원</p> */}
                  <p>             </p>
                  <p>             </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <MenuFooter />
    </>
  );
}

export default Category;
