import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNavi";

const RevenuePage = () => {
  const [revenueData, setRevenueData] = useState({
    daily: [],
    weekly: [],
    monthly: 0,
  });
  const [totalSoldProducts, setTotalSoldProducts] = useState(0);
  const [showAllDays, setShowAllDays] = useState(false);
  const [orders, setOrders] = useState([]);

  const calculateTotalProductsSoldOnDay = (selectedDay, orders) => {
    const ordersOnSelectedDay = orders.filter(
      (order) =>
        new Date(order.orderDate).toLocaleDateString("en-GB") === selectedDay
    );
    const totalProductsSold = ordersOnSelectedDay.reduce(
      (acc, order) => acc + order.quantity,
      0
    );
    return totalProductsSold;
  };
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get("/api/orders-for-admin");
        const orders = response.data;

        const dailyRevenue = {};
        orders.forEach((order) => {
          const orderDate = new Date(order.orderDate).toLocaleDateString(
            "en-GB"
          );
          dailyRevenue[orderDate] =
            (dailyRevenue[orderDate] || 0) +
            order.quantity * order.product.price;
        });

        const sortedDailyRevenue = Object.entries(dailyRevenue).sort(
          ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
        );

        // Tính tổng doanh thu từng tuần
        const weeklyRevenue = {};
        orders.forEach((order) => {
          const orderDate = new Date(order.orderDate);
          const weekStartDate = new Date(
            orderDate.getFullYear(),
            orderDate.getMonth(),
            orderDate.getDate() - orderDate.getDay()
          );
          const weekStartDateString = weekStartDate.toLocaleDateString("en-GB");
          weeklyRevenue[weekStartDateString] =
            (weeklyRevenue[weekStartDateString] || 0) +
            order.quantity * order.product.price;
        });

        // Tính tổng doanh thu tháng này
        const monthlyRevenue = orders.reduce(
          (acc, order) => acc + order.quantity * order.product.price,
          0
        );

        // Tính tổng số sản phẩm đã bán
        const totalSoldProducts = orders.reduce(
          (acc, order) => acc + order.quantity,
          0
        );

        setRevenueData({
          daily: sortedDailyRevenue,
          weekly: Object.entries(weeklyRevenue),
          monthly: monthlyRevenue,
        });
        setTotalSoldProducts(totalSoldProducts);
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching revenue data", error);
      }
    };
    fetchRevenueData();
  }, []);

  // Tính tổng số sản phẩm đã bán trong mỗi tuần
  const calculateTotalProductsSoldInWeeks = (orders) => {
    const weeklyProductsSold = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.orderDate);
      const weekStartDate = new Date(
        orderDate.getFullYear(),
        orderDate.getMonth(),
        orderDate.getDate() - orderDate.getDay()
      ).toLocaleDateString("en-GB");

      if (!weeklyProductsSold[weekStartDate]) {
        weeklyProductsSold[weekStartDate] = 0;
      }

      weeklyProductsSold[weekStartDate] += order.quantity;
    });

    return weeklyProductsSold;
  };

  // Tính tổng số sản phẩm đã bán trong mỗi tháng
  const calculateTotalProductsSoldInMonths = (orders) => {
    const monthlyProductsSold = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.orderDate);
      const monthKey = `${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;

      if (!monthlyProductsSold[monthKey]) {
        monthlyProductsSold[monthKey] = 0;
      }

      monthlyProductsSold[monthKey] += order.quantity;
    });

    return monthlyProductsSold;
  };

  // Tính tổng số sản phẩm đã bán trong từng tuần và tháng
  const weeklyProductsSold = calculateTotalProductsSoldInWeeks(orders);
  const monthlyProductsSold = calculateTotalProductsSoldInMonths(orders);

  const calculateRevenuePerMonth = (orders) => {
    const revenuePerMonth = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.orderDate);
      const monthKey = `${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;

      if (!revenuePerMonth[monthKey]) {
        revenuePerMonth[monthKey] = 0;
      }

      revenuePerMonth[monthKey] += order.quantity * order.product.price;
    });

    return revenuePerMonth;
  };
  // Tính doanh thu từng tháng
  const revenuePerMonth = calculateRevenuePerMonth(orders);

  return (
    <div className="container mx-auto my-8">
      <AccountNav></AccountNav>

      <div className="bg-white p-4 rounded-md">
        <h2 className="text-2xl mb-4 text-red-500 flex justify-center items-center">
          DOANH THU PERFUMEHAVEN
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-md border-2 border-blue-600">
            <h3 className="text-xl mb-2">Doanh thu tuần</h3>
            {revenueData.weekly.map(([weekStartDate, revenue]) => (
              <p className="text-lg font-semibold" key={weekStartDate}>
                Bắt đầu từ {weekStartDate}:{" Tổng: "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(revenue * 1000)}
              </p>
            ))}
          </div>

          <div className="bg-white p-4 rounded-md border-2 border-blue-600">
            <h3 className="text-xl mb-2">Doanh thu mỗi tháng</h3>
            {Object.entries(revenuePerMonth).map(([monthKey, revenue]) => (
              <p className="text-lg font-semibold" key={monthKey}>
                Tháng {monthKey}: {"Doanh thu: "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(revenue * 1000)}
              </p>
            ))}
          </div>

          <div className="bg-white p-4 rounded-md border-2 border-blue-600">
            <h3 className="text-xl mb-2">Doanh thu mỗi ngày</h3>
            {!showAllDays
              ? revenueData.daily.slice(3, 5).map(([day, revenue]) => (
                  <p className="text-lg mb-2" key={day}>
                    <span className="font-semibold">Ngày {day}:</span>
                    {" Tổng "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(revenue * 1000)}
                    {` - Đã bán : ${calculateTotalProductsSoldOnDay(
                      day,
                      orders
                    )} sản phẩm`}
                  </p>
                ))
              : revenueData.daily.map(([day, revenue]) => (
                  <p className="text-lg mb-2" key={day}>
                    <span className="font-semibold">Ngày {day}:</span>
                    {" Tổng "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(revenue * 1000)}
                    {` - Đã bán : ${calculateTotalProductsSoldOnDay(
                      day,
                      orders
                    )} sản phẩm`}
                  </p>
                ))}
            <button
              className="mt-2 p-3 rounded cursor-pointer"
              onClick={() => setShowAllDays(!showAllDays)}
            >
              {showAllDays ? "Ẩn bớt" : "Tất cả"}
            </button>
          </div>

          <div className="bg-white p-4 rounded-md border-2 border-blue-600">
            <h3 className="text-xl mb-2">Tổng số sản phẩm đã bán</h3>
            {Object.entries(monthlyProductsSold).map(
              ([monthKey, productsSold]) => (
                <p className="text-lg font-semibold" key={monthKey}>
                  Tháng {monthKey}: {"Tổng số sản phẩm đã bán: "} {productsSold}
                </p>
              )
            )}
          </div>
        </div>

        <div className="mt-4 bg-white p-4 rounded-md border-2 border-blue-600">
          <p className="text-3xl text-red-600 p-4 rounded-md">
            Tổng doanh thu:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(revenueData.monthly * 1000)}
            {` - Với: ${totalSoldProducts} sản phẩm đã bán`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;
