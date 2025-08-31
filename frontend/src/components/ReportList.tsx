import { useContext, useEffect, useState } from 'react';
import TokenContext from '../contexts/TokenContext';
import ListWrapper from './ListWrapper';

interface ReportInterface {
    _id: string,
    userId: string,
    quizId: string,
    quizName: String,
    score: number,
    total: number,
    percentage: number,
    result: String
}

const serverURL = 'http://localhost:3000';

const ReportList = () => {
    const [reports, setReports] = useState([]);
    const tokenContext = useContext(TokenContext);
    const token = tokenContext.token;
    useEffect(() => {
        fetch(serverURL + '/report', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(result => {
                setReports(result.data)
            })
            .catch(err => {
                err.message === 'Failed to fetch' && alert('Server not working can\'t fetch Reports.')
            })
    }, []);

    const reportList = reports.map((report: ReportInterface) => {
        return (
            <li className='flex justify-between' id={report._id}>
                <span className='w-3/5 overflow-auto [&::-webkit-scrollbar]:hidden'>{report.quizName}</span>
                <div className='flex justify-around w-2/5 sm:w-1/3 lg:w-1/4'>
                    <p>{report.score}/{report.total}</p>
                    <span className={`w-1/3 lg:w-1/4 grid place-items-center text-center text-xs sm:text-2xl lg:py-auto rounded-full ${report.result === 'Pass' ? 'bg-[#2BFF40]' : 'bg-[#EC0000]'}`}>{report.result}</span>
                </div>

            </li>
        );
    });

    return (
        <div className='h-11/12 *:h-full py-2 lg:py-5'>
            <ListWrapper>
                {reportList.length ? reportList.reverse() : 'There are no reports'}
            </ListWrapper>
        </div>
    )
}

export default ReportList;