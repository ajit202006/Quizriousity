import { useContext, useEffect, useState } from "react";
import TokenContext from "../contexts/TokenContext";
import ListWrapper from "./ListWrapper";

interface ReportInterface {
    _id:string,
    userId:string,
    quizId: string,     
    quizName: String,
    score: number,
    total: number,
    percentage: number,
    result: String
}

const serverURL = "http://localhost:3000";

const ReportList = () => {
    const [reports, setReports] = useState([]);
    const tokenContext = useContext(TokenContext);
    const token = tokenContext.token;
    useEffect(() => {
        fetch(serverURL+'/report', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
            }
        })
            .then(response => response.json())
            .then(result => {
                setReports(result.data)
            })
            .catch(err => {
                err.message === "Failed to fetch" && alert("Server not working can't fetch Reports.")
            })
    }, []);

    const reportList = reports.map((report:ReportInterface) => {
        return (
            <li className="flex justify-between" id={report._id}>
                {report.quizName}
                <div className="flex justify-around w-1/4">
                    <p>{report.score}/{report.total}</p>
                    <span className={`w-1/4 text-center py-auto rounded-full ${report.result === 'Pass' ? 'bg-[#2BFF40]' : 'bg-[#EC0000]'}`}>{report.result}</span>
                </div>

            </li>
        );
    });

    return (
        <ListWrapper>
            {reportList.length ? reportList : "There are no reports"}
        </ListWrapper>
    )
}

export default ReportList;