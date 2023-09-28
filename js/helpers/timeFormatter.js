export function formattedDate(dateTimeStr) {
    const date = new Date(dateTimeStr);
  
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return `${monthNames[monthIndex]} ${day}, ${year}`;
  }
  