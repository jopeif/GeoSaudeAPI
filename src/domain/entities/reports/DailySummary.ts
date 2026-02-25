export type DailyReport = {
    id:string,
    
    weeklyReportId: string;
    startDate: Date;
    endDate: Date;
    summaryResponsible: string;

    totalHouseholdsTreated: number;
    totalHouseholdsInspected: number;

    totalCriticalPoints: number;

    totalBreedingSitesFound: number;
    totalBreedingSitesEliminated: number;

    totalLarvaeFound: number;
    totalAdultsCollected: number;

    totalSuspectedCases: number;

    observations: string;

    createAt:Date;
 
}