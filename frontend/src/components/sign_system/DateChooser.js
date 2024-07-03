import React, {useState, useEffect} from 'react';
import colors from "../../values/colors";

export const DateChooser = () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [daysInMonth, setDaysInMonth] = useState([]);

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    useEffect(() => {
        const getDaysInMonth = (month, year) => {
            switch (month) {
                case '1':
                case '3':
                case '5':
                case '7':
                case '8':
                case '10':
                case '12':
                    return 31;
                case '4':
                case '6':
                case '9':
                case '11':
                    return 30;
                case '2':
                    return isLeapYear(year) ? 29 : 28;
                default:
                    return 31;
            }
        };

        if (month && year) {
            const days = Array.from({length: getDaysInMonth(month, year)}, (_, i) => i + 1);
            setDaysInMonth(days);
        } else {
            setDaysInMonth([]);
        }
    }, [month, year]);

    const handleDayChange = (e) => {
        setDay(e.target.value);
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    return (<div
        style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2%'
        }}>
        <p style={{display: 'flex', marginBottom: '2%', color: colors.gray}}>
            დაბადების თარიღი
        </p>


        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '90%',
            height: '90%', maxHeight: '50px'
        }}>
            <select value={year} onChange={handleYearChange} style={{
                width: '30%',
                height: '100%',
                boxSizing: 'border-box',
                borderStyle: 'solid',
                borderColor: colors.primary,
                borderRadius: '15px',
                borderWidth: '2px'
            }}>
                <option value="" style={{textAlign: 'center'}}>წელი</option>
                {Array.from({length: 100}, (_, i) => new Date().getFullYear() - 13 - i).map((year) => (
                    <option key={year} value={year} style={{textAlign: 'center'}}>
                        {year}
                    </option>))}
            </select>

            <select value={month} onChange={handleMonthChange} style={{
                width: '30%',
                height: '100%',
                boxSizing: 'border-box',
                borderStyle: 'solid',
                borderColor: colors.primary,
                borderRadius: '15px',
                borderWidth: '2px'
            }}>
                <option value="" style={{textAlign: 'center'}}>თვე</option>
                {Array.from({length: 12}, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month} style={{textAlign: 'center'}}>
                        {month}
                    </option>))}
            </select>

            <select value={day} onChange={handleDayChange} style={{
                width: '30%',
                height: '100%',
                boxSizing: 'border-box',
                borderStyle: 'solid',
                borderColor: colors.primary,
                borderRadius: '15px',
                borderWidth: '2px'
            }}>
                <option value="" style={{textAlign: 'center'}}>დღე</option>
                {daysInMonth.map((day) => (<option key={day} value={day} style={{textAlign: 'center'}}>
                    {day}
                </option>))}
            </select>
        </div>
    </div>);
};
