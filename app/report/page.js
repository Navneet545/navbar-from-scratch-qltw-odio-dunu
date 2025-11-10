import React from 'react'
import AdvancedReportTable1 from '../../components/ReportTable/Report'

const page = () => {
  return (
    <div className="flex-grow w-full overflow-y-auto p-2">
      {/* Content Area */}
        <main className="flex-grow w-full mx-auto px-0 py-2">
            <div className="bg-background text-foreground">
                <AdvancedReportTable1/>
            </div>
        </main>

    </div>
  )
}

export default page;