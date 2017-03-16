window.fzzDevReportData=window.fzzDevReportData || {
    storage: [],
    description: "The purpose of the object is to collect fzz-script's performance bugs",
};

function devReport(msg, mark='test'){
    window.fzzDevReportData.storage.push({msg,mark});
};

module.exports = devReport;