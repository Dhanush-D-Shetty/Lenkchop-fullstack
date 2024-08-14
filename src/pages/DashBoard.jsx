import CreateLink from '@/components/CreateLink';
import Error from '@/components/Error';
import LinkCard from '@/components/LinkCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { urlState } from '@/context';
import { getClicksofUrls } from '@/db/apiClicks';
import { getUrls } from '@/db/apiUrls';
import useFetch from '@/hooks/useFetch';
import { Filter } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';

const DashBoard = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const { user } = urlState(); //  current user data from the context-api
  const { data: urls, loading, error, fn: fnUrls } = useFetch(getUrls, user?.id);  // urls data from the table
  //.. data of Clicks from the table for the respective user   ( urls will be an array )
  const { data: clicks, loading: loadingClicks, fn: fnClicks } = useFetch(getClicksofUrls, urls?.map((url) => url.id));  // clicks data from the table for the respective user

  // ... filter the data (urls) based on search query urls= [{},{},..]
  const filterdUrlsData = urls?.filter((url) => {
    return url.title.toLowerCase().includes(searchQuery.toLowerCase());
  })

  useEffect(() => {
    fnUrls();
  }, [])

  // ....run this only if urls are avilabe
  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length])


  // console.log("urls data = ", urls);
  // console.log("clciks data = ",clicks);

  return (
    <div className='flex flex-col gap-6 mb-4'>
      {loading || loadingClicks && <BarLoader width={"100%"} color="#fff" />}

      <div className='grid grid-cols-2 gap-5'>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Total Urls</CardTitle>
            <CardContent className="text-center">
              <p className='text-xl font-bold'>{urls?.length}</p>
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Total Clicks</CardTitle>
            <CardContent className="text-center">
              <p className='text-xl font-bold'>{clicks?.length ? clicks?.length : "0"}</p>
            </CardContent>
          </CardHeader>
        </Card>
      </div>

      <div className='flex justify-between'>
        <h1 className=' text-3xl sm:text-4xl font-extrabold'>My Links</h1>

        <CreateLink />        {/* custom component */}

      </div>

      <div className="relative">
        <Input type="text" placeholder="Filter Links" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <Filter className='absolute top-1.5 right-2 p-1' />   {/* Filter icon from lucid-icons */}
      </div>

      {error && <Error message={error.message} />}
      
      {(filterdUrlsData || []).map((urlData, i) => {
        return <LinkCard key={i} urlData={urlData} fetchUrls={fnUrls} />
      })}
    </div>
  )
}

export default DashBoard;