import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './ChartPengajuan.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartPengajuan = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllData = async () => {
    try {
      // ambil token dari cookie
      const token = document.cookie.replace(/(?:^|.*;\s*)token\s*=\s*([^;]*).*$|^.*$/, "$1");
      //set cookie as header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get('http://localhost:3000/admin/getaccpengajuan', config)
      setData(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllData();
  }, [])

  const processData = (data) => {
    const counts = {};

    data.forEach(item => {
      const date = new Date(item.createdAt); // Ensure correct date field is used
      const monthYear = date.toLocaleString('en-us', { month: 'long', year: 'numeric' });

      if (!counts[monthYear]) {
        counts[monthYear] = 0;
      }
      counts[monthYear]++;
    });

    return counts;
  };

  const processedData = processData(data);
  const chartLabels = Object.keys(processedData).sort((a, b) => new Date(a) - new Date(b));
  const chartValues = chartLabels.map(label => processedData[label]);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Pengajuan Counts',
        data: chartValues,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        color: 'black',
      },
      title: {
        display: true,
        text: 'Pengajuan Counts of the Month',
        color: 'black',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'green', 
        },
      },
      x: {
        ticks: {
          color: 'green', 
        },
      },
    },
  };

  return (
    <div >
      {isLoading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <div className="chart-container">
          <Line data={chartData} options={options} />
        </div>
      )}
    </div>)
}

export default ChartPengajuan