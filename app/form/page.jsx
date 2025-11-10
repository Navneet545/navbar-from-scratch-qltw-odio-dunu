import React from 'react'
import DonationForm from '@/components/FormComponents/MainComponent'

const page = () => {
  return (
     <div className="flex-grow w-full overflow-y-auto p-2">
      {/* Content Area */}
        <main className="flex-grow w-full mx-auto px-0 py-2">
            <div className="bg-background text-foreground px-2 py-0">
              <DonationForm/>
            </div>
        </main>

    </div>
  )
}

export default page