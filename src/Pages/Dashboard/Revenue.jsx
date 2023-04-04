import axios from "axios";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { ImCreditCard, ImStack } from "react-icons/im";

const CountItem = ({ children, title, total, bgColor }) => {
  return (
    <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white flex justify-center text-center h-full">
      <div
        className={`p-4 border border-gray-200 w-full rounded-lg text-white ${bgColor}`}
      >
        <div
          className={`text-center inline-block text-3xl text-white ${bgColor}`}
        >
          {children}
        </div>
        <div>
          <p className="mb-3 text-base font-medium text-gray-50 ">{title}</p>
          <p className="text-3xl font-bold leading-none text-gray-50 ">
            ${total}
          </p>
        </div>
      </div>
    </div>
  );
};

const Revenue = () => {
  const [totalRevenue, setTotalRevenue] = useState();
  const [todayRevenue, setTodayRevenue] = useState();
  const [thisMonthRevenue, setThisMonthRevenue] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const resTotal = await axios.get(`/admin/total-revenue`);
      setTotalRevenue(resTotal.data.totalRevenue.toFixed(2));
      const resToday = await axios.get(`/admin/today-revenue`);
      setTodayRevenue(resToday.data.toFixed(2));
      const resThisMonth = await axios.get(`/admin/this-month-revenue`);
      setThisMonthRevenue(resThisMonth.data.toFixed(2));
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="grid gap-4 mb-8 md:grid-cols-3 xl:grid-cols-3">
        <CountItem
          title="Today Order"
          total={todayRevenue}
          bgColor="bg-teal-500"
        >
          <ImStack />
        </CountItem>

        <CountItem
          title="This Month"
          total={thisMonthRevenue}
          bgColor="bg-blue-500"
        >
          <FiShoppingCart />
        </CountItem>

        <CountItem
          title="Total Order"
          total={totalRevenue}
          bgColor="bg-green-500"
        >
          <ImCreditCard />
        </CountItem>
      </div>
    </section>
  );
};

export default Revenue;
