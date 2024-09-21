  // useEffect(()=>{
  //     async function fetchZoneData() {
  //       try {
  //         const response = await axios.get(`${backendUrl}/api/zone-records`, {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem('token')}`,
  //           },
  //         })
  //         if (response.data) {
  //           console.log(response.data, "ZONE DATA")
  //           const aggregatedData = response.data.data.reduce((acc, curr) => {
  //             // Check if the entry already exists in the accumulator
  //             const existingEntry = acc.find(
  //               (entry) =>
  //                 entry.defect_name === curr.defect_name &&
  //                 entry.station_id === curr.station_id &&
  //                 entry.screen_no === curr.screen_no,
  //             )

  //             console.log("DEFEEEEE", curr)
  //             if (existingEntry) {
  //               // Increment count if the entry already exists
  //               existingEntry.count = (existingEntry.count || 1) + 1
  //             } else {
  //               // Otherwise, create a new entry
  //               acc.push({
  //                 id: curr.id,
  //                 defect_name: curr.defect_name,
  //                 defect_name_hi: curr.defect_name_hi,
  //                 station_id: curr.station_id,
  //                 screen_no: curr.screen_no,
  //                 operator_name: curr.operator_name,
  //                 updated_at: curr.updated_at,
  //                 count: 1,
  //                 is_updated: false, // default value for is_updated
  //               })
  //             }

  //             return acc
  //           }, [])
  //           console.log(aggregatedData, 'FORMATTED DATA')
  //           dispatch(setDefects(aggregatedData));
  //         } else {
  //           toast.error('Failed to fetch zone records')
  //         }
  //       } catch (error) {
  //         console.error('Error fetching zone records:', error)
  //         toast.error('Failed to fetch zone records')
  //       }
  //     }

  //   fetchZoneData();
  // },[])

  // useEffect(() => {
  //   if (id) {
  //     console.log('Zone ID:', id)
  //   }
  // }, [id])

  
  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     console.log('Received message:', lastMessage.data)
  //     try {
  //       const message = JSON.parse(lastMessage.data)
  //       console.log('Parsed message:', message)
  //       // if(message.timer){
  //       //   setAlertTimer(message.timer)
  //       // }

  //       if (message.defect) {
  //         const operatorMap = new Map()
  //         message.operators.forEach((operator) => {
  //           operatorMap.set(operator.station_id, operator.operator_name)
  //         })

  //         // Add operator_name to each defect based on station_id
  //         const updatedDefects1 = message.defects.map((defect) => ({
  //           ...defect,
  //           operator_name: operatorMap.get(defect.station_id) || 'Unknown Operator',
  //           updated_at: message.updated_at, // Include updated_at for consistency
  //         }))

  //         console.log(updatedDefects1, 'updated defect 1', defects, [
  //           ...defects,
  //           ...updatedDefects1,
  //         ])

  //         localStorage.setItem('active_clients', message.active_clients || 0)
  //         const updatedDefects = [...defects, ...updatedDefects1]
  //         console.log(updatedDefects, 'SOCKET DATA')
  //         dispatch(setDefects(updatedDefects))

  //       }
  //     } catch (error) {
  //       console.error('Error parsing message:', error)
  //     }
  //   }
  // }, [lastMessage])

  // const defectsArr = useMemo(() => {
  //   const defectMap = new Map()

  //   // Collect all defects into the map, marking is_updated
  //   defects.forEach((defect) => {
  //     const prevDefect = prevDefectsRef.current.find((el) => el.id === defect.id)
  //     const isUpdated = prevDefect ? prevDefect.count !== defect.count : true
  //     defectMap.set(defect.id, { ...defect, is_updated: isUpdated })
  //   })

  //   console.log(Array.from(defectMap.values()))
  //   // Convert Map values to an array and sort by updated_at descending
  //   const sortedDefects = Array.from(defectMap.values()).sort((a, b) => {
  //     const dateA = new Date(a.updated_at)
  //     const dateB = new Date(b.updated_at)
  //     return dateB - dateA // Sort in descending order
  //   })

  //   return sortedDefects
  // }, [defects, prevDefectsRef])



  // useEffect(() => {
  //   prevDefectsRef.current = defects // Update previous defects reference
  // }, [defects])


  // useEffect(() => {
  //   defects.forEach((defect) => {
  //     if (defect.is_updated) {
  //       const timer = setTimeout(() => {
  //         dispatch(
  //           setDefects(defects.map((d) => (d.id === defect.id ? { ...d, is_updated: false } : d))),
  //         )
  //       }, parseInt(alertTimer)*1000 || 5000)

  //       return () => clearTimeout(timer)
  //     }
  //   })
  // }, [defects, dispatch])