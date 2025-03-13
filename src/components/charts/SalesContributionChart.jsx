import { useState, useEffect } from 'react';

const SalesContributionChart = ({ salesData }) => {
  const [contributionData, setContributionData] = useState([]);
  const [monthsToShow, setMonthsToShow] = useState(12); // Default to show 12 months
  const [selectedYear, setSelectedYear] = useState(null); // Track selected year

  useEffect(() => {
    if (salesData?.sales && salesData.sales.length > 0) {
      processContributionData();
    }
  }, [salesData, monthsToShow, selectedYear]);

  // Process sales data to create contribution data structure
  const processContributionData = () => {
    // Get current date as end date
    const endDate = new Date();
    let startDate;
    
    if (selectedYear) {
      // If a specific year is selected, show the entire year
      startDate = new Date(selectedYear, 0, 1); // January 1st of selected year
      endDate.setFullYear(selectedYear, 11, 31); // December 31st of selected year
    } else {
      // Otherwise show last X months from today
      startDate = new Date(endDate);
      startDate.setMonth(endDate.getMonth() - monthsToShow + 1);
      startDate.setDate(1); // Start from the 1st day of the month
    }
    
    // Create a map to store sales by date
    const salesByDate = {};
    
    // Initialize all dates in the range with 0 sales
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateKey = currentDate.toISOString().split('T')[0];
      salesByDate[dateKey] = 0;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Aggregate sales by date
    salesData.sales.forEach(sale => {
      // Use sale.date if available, otherwise use current date as fallback
      const saleDate = sale.date ? new Date(sale.date) : new Date();
      const dateKey = saleDate.toISOString().split('T')[0];
      
      // Only count sales within our date range
      if (salesByDate.hasOwnProperty(dateKey)) {
        salesByDate[dateKey] += parseFloat(sale.total) || 0;
      }
    });
    
    // Convert to array format for rendering
    const data = Object.entries(salesByDate).map(([date, amount]) => ({
      date,
      amount,
      intensity: getIntensityLevel(amount)
    }));
    
    setContributionData(data);
  };
  
  // Determine color intensity based on sales amount
  const getIntensityLevel = (amount) => {
    if (amount === 0) return 0;
    if (amount < 100) return 1;
    if (amount < 300) return 2;
    if (amount < 500) return 3;
    return 4;
  };
  
  // Group data by week for display
  const getWeeksData = () => {
    // Sort data by date
    const sortedData = [...contributionData].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    if (sortedData.length === 0) return [];
    
    // Get the first date and determine what day of the week it is (0 = Sunday, 6 = Saturday)
    const firstDate = new Date(sortedData[0].date);
    const firstDay = firstDate.getDay();
    
    // Create a complete grid with all weeks
    const weeks = [];
    let currentWeek = [];
    
    // Add empty cells for days before the first date to align with week
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null);
    }
    
    // Process all dates
    sortedData.forEach(day => {
      const dayDate = new Date(day.date);
      const dayOfWeek = dayDate.getDay();
      
      // If we're at a new week, push the current week and start a new one
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        // Fill any remaining days in the previous week
        while (currentWeek.length < 7) {
          currentWeek.push(null);
        }
        weeks.push(currentWeek);
        currentWeek = [];
      }
      
      // Add the current day
      currentWeek.push(day);
      
      // If this is the last day, ensure we add the week
      if (day === sortedData[sortedData.length - 1]) {
        // Fill any remaining days in the last week
        while (currentWeek.length < 7) {
          currentWeek.push(null);
        }
        weeks.push(currentWeek);
      }
    });
    
    return weeks;
  };
  
  // Get month labels for the chart
  const getMonthLabels = () => {
    const months = [];
    const sortedDates = contributionData
      .map(d => new Date(d.date))
      .sort((a, b) => a - b);
    
    if (sortedDates.length === 0) return [];
    
    let currentMonth = -1;
    let currentYear = -1;
    
    sortedDates.forEach(date => {
      const month = date.getMonth();
      const year = date.getFullYear();
      
      // Add a new month label when the month changes
      if (month !== currentMonth || year !== currentYear) {
        currentMonth = month;
        currentYear = year;
        
        // Calculate position based on weeks
        const weeksSinceStart = Math.floor((date - sortedDates[0]) / (7 * 24 * 60 * 60 * 1000));
        
        months.push({
          month: date.toLocaleString('default', { month: 'short' }),
          year: year,
          position: weeksSinceStart
        });
      }
    });
    
    return months;
  };
  
  // Handle month range change
  const handleMonthRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setMonthsToShow(value);
    setSelectedYear(null); // Reset selected year when changing month range
  };
  
  // Handle year selection
  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    if (year === 0) {
      setSelectedYear(null); // Reset to default (last X months)
    } else {
      setSelectedYear(year);
    }
  };
  
  // Get color class based on intensity
  const getColorClass = (intensity) => {
    switch (intensity) {
      case 0: return 'bg-green-800';
      case 1: return 'bg-gray-800';
      case 2: return 'bg-green-600';
      case 3: return 'bg-green-400';
      case 4: return 'bg-green-400';
      default: return 'bg-gray-800';
    }
  };
  
  // Format amount for tooltip
  const formatAmount = (amount) => {
    return `S/. ${parseFloat(amount).toFixed(2)}`;
  };
  
  const weeks = getWeeksData();
  const monthLabels = getMonthLabels();
  
  // Get current year and available years for dropdown
  const currentYear = new Date().getFullYear();
  const availableYears = [currentYear, currentYear - 1, currentYear + 1]; // Current, previous, and next year
  
  return (
    <div className="bg-gradient-to-r from-black to-gray-950 rounded-xl shadow-lg shadow-black p-6 mb-8 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">Historial de Ventas</h2>
        <div className="flex space-x-2">
          <select 
            className="bg-gray-900 border border-gray-300 text-gray-100 text-sm rounded-lg p-2.5"
            value={selectedYear || 0}
            onChange={handleYearChange}
          >
            <option value={0}>Últimos meses</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          {!selectedYear && (
            <select 
              className="bg-gray-900 border border-gray-300 text-gray-100 text-sm rounded-lg p-2.5"
              value={monthsToShow}
              onChange={handleMonthRangeChange}
            >
              <option value="1">Último mes</option>
              <option value="3">Últimos 3 meses</option>
              <option value="6">Últimos 6 meses</option>
              <option value="12">Último año</option>
            </select>
          )}
        </div>
      </div>
      
      {/* Month labels */}
      <div className="flex mb-1 text-xs text-gray-200">
        <div className="w-10"></div> {/* Space for day labels */}
        <div className="flex-grow flex">
          {monthLabels.map((label, i) => (
            <div 
              key={i} 
              className="flex-grow text-center"
              style={{ marginLeft: i === 0 ? `${label.position * 16}px` : '0' }}
            >
              {`${label.month} ${label.year !== currentYear ? label.year : ''}`}
            </div>
          ))}
        </div>
      </div>
      
      {/* Contribution grid */}
      <div className="flex">
        {/* Day labels */}
        <div className="w-10 text-xs text-gray-300 flex flex-col justify-around h-full pt-2">
          <div>Dom</div>
          <div>Lun</div>
          <div>Mar</div>
          <div>Mié</div>
          <div>Jue</div>
          <div>Vie</div>
          <div>Sáb</div>
        </div>
        
        {/* Grid */}
        <div className="flex-grow">
          <div className="flex space-x-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col space-y-1">
                {week.map((day, dayIndex) => (
                  <div 
                    key={dayIndex}
                    className={`w-4 h-4 rounded-sm ${day ? getColorClass(day.intensity) : 'bg-gray-800'}`}
                    title={day ? `${day.date}: ${formatAmount(day.amount)}` : ''}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-end mt-4 text-xs text-gray-400">
        <span className="mr-2">Menos</span>
        <div className="w-3 h-3 rounded-sm bg-gray-800 mr-1"></div>
        <div className="w-3 h-3 rounded-sm bg-green-800 mr-1"></div>
        <div className="w-3 h-3 rounded-sm bg-green-600 mr-1"></div>
        <div className="w-3 h-3 rounded-sm bg-green-400 mr-1"></div>
        <span className='text-gray-200'>Más</span>
      </div>
    </div>
  );
};

export default SalesContributionChart;