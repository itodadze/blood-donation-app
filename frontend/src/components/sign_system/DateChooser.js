import React, {useState, useEffect} from 'react';
import colors from "../../values/colors";
import warning from "../../assets/icons/warning_invalid.svg";

export const DateChooser = ({handleFunc}) => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [error, setError] = React.useState(null);

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    useEffect(() => {
        const getDaysInMonth = (month, year) => {
            switch (month) {
                case '01':
                case '03':
                case '05':
                case '07':
                case '08':
                case '10':
                case '12':
                    return 31;
                case '04':
                case '06':
                case '09':
                case '11':
                    return 30;
                case '02':
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
        handleFunc(e.target.value + "/"  + month + "/" + year, setError)
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        handleFunc(day + "/"  + e.target.value + "/" + year, setError)
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
        handleFunc(day + "/"  + month + "/" + e.target.value, setError)
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

        <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '2%'
        }}>
            <p style={{display: 'flex', marginBottom: '2%', color: colors.gray}}>
                დაბადების თარიღი
            </p>

            <div className='credential-field-warning-box' style={{
                '--display': error ? 'flex' : 'none'
            }}>
                <img src={warning} alt={'warning'} className='credential-field-warning'/>

                <div className="credential-warning-hover" style={{
                    '--background-color': colors.primary,
                    '--text-color': colors.pearl,
                }}> {error} </div>
            </div>

        </div>


        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '90%',
            height: '90%', maxHeight: '50px'
        }}>
            <select value={year} onChange={handleYearChange} onBlur={handleYearChange} style={{
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

            <select value={month} onChange={handleMonthChange} onBlur={handleMonthChange} style={{
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
                    <option key={month < 10 ? '0' + month : month}
                            value={month < 10 ? '0' + month : month}
                            style={{textAlign: 'center'}}>
                        {month < 10 ? '0' + month : month}
                    </option>))}
            </select>

            <select value={day} onChange={handleDayChange} onBlur={handleDayChange} style={{
                width: '30%',
                height: '100%',
                boxSizing: 'border-box',
                borderStyle: 'solid',
                borderColor: colors.primary,
                borderRadius: '15px',
                borderWidth: '2px'
            }}>
                <option value="" style={{textAlign: 'center'}}>დღე</option>
                {daysInMonth.map((day) => (<option key={day < 10 ? '0' + day : day}
                                                   value={day < 10 ? '0' + day : day}
                                                   style={{textAlign: 'center'}}>
                    {day < 10 ? '0' + day : day}
                </option>))}
            </select>
        </div>
    </div>);
};
