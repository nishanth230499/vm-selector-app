import React from 'react'
import './App.scss'
import { tabs, images } from './constants/constants'
import { DropDown } from './components/DropDown'
import { regions } from './constants/constants'
import * as Pages from './components/Pages'
import crossIcon from './assets/cross.svg'
import { Button } from './components/Button'

interface IModal {
  isModalOpen: boolean
  heading: string
  color: string
  message: string
  onOK: () => void
  onCancel: () => void
}

const App = () => {
  const enabledTabs = ['open', '', '', '', 'open']

  const [activeTab, setActiveTab] = React.useState(tabs[0])
  const [region, setRegion] = React.useState('')

  const [modalProps, setModalprops] = React.useState({
    isModalOpen: false,
    heading: '',
    color: '',
    message: '',
    onOK: () => {},
    onCancel: () => {},
  })

  const [choosenImgId, setChoosenImgId] = React.useState('')
  const [choosenImgVersion, setChoosenImgVersion] = React.useState('')

  const [selectedInstance, setSelectedInstance] = React.useState('')
  const [selectedCore, setSelectedCore] = React.useState('')
  const [selectedMem, setSelectedMem] = React.useState('')

  const [storageData, setStorageData] = React.useState([
    {
      type: 'Magnetic Disk',
      volume: 'Root',
      capacity: 0,
      encryption: false,
      iops: 0,
      backup: false,
      remarks: '',
      cost: 0,
    },
  ])

  const [selectedNetwork, setSelectedNetwork] = React.useState(512)

  const selectImage = (imageId: string, version: string) => {
    if (region === '') {
      setModalprops({
        isModalOpen: true,
        heading: 'Warning',
        message: 'Please select the region first',
        color: '#F1AB1E',
        onOK: clearModal,
        onCancel: clearModal,
      })
    } else {
      setActiveTab(tabs[tabs.indexOf(activeTab) + 1])
      setChoosenImgId(imageId)
      setChoosenImgVersion(version)
    }
  }

  const clearModal = () => {
    setModalprops({
      isModalOpen: false,
      heading: '',
      message: '',
      color: '',
      onOK: () => {},
      onCancel: () => {},
    })
  }

  const changeInst = (inst: string) => {
    if (selectedMem || selectedCore) {
      setModalprops({
        isModalOpen: true,
        heading: 'Warning',
        message:
          'Changing the instance will make changes to the configurations. All data will be lost',
        color: '#F1AB1E',
        onOK: () => {
          setSelectedInstance(inst)
          setSelectedCore('')
          setSelectedMem('')
          clearModal()
        },
        onCancel: clearModal,
      })
    } else {
      setSelectedInstance(inst)
    }
  }

  const selectInstance = (inst: string) => {
    if (selectedMem && selectedCore && selectedInstance) {
      setActiveTab(tabs[tabs.indexOf(activeTab) + 1])
    } else {
      setModalprops({
        isModalOpen: true,
        heading: 'Warning',
        message: 'Please select Instance Type, Core and Memory',
        color: '#F1AB1E',
        onOK: clearModal,
        onCancel: clearModal,
      })
    }
  }

  const estimate = () => {
    let estimates = []
    if (choosenImgId) {
      let cost
      images.forEach((image) => {
        if (image.id === choosenImgId) cost = image.cost
      })
      estimates.push({
        name: choosenImgId,
        cost: cost,
      })
    }
    if (selectedCore) {
      estimates.push({
        name: 'CPU - ' + selectedCore,
        cost:
          selectedCore === '16 Core' ? 40 : selectedCore === '8 Core' ? 20 : 0,
      })
    }
    if (selectedMem) {
      estimates.push({
        name: 'Memory - ' + selectedMem,
        cost: selectedMem === '64 GB' ? 40 : selectedMem === '32 GB' ? 20 : 0,
      })
    }
    if (storageData && storageData.length > 1) {
      let cost = 0
      storageData.forEach((storage) => {
        if (storageData.indexOf(storage) !== 0) {
          cost += storage.type === 'Magnetic Disk' ? 20 : 40
        }
      })
      estimates.push({
        name: 'Storage',
        cost: cost,
      })
    }
    if (selectedNetwork !== 0) {
      let cost = 0
      if (selectedNetwork >= 512 && selectedNetwork < 1024) cost = 5
      if (selectedNetwork >= 1024 && selectedNetwork < 1536) cost = 10
      if (selectedNetwork >= 1536 && selectedNetwork <= 2048) cost = 15
      estimates.push({
        name: 'Network Bandwidth',
        cost: cost,
      })
    }
    return estimates
  }

  const sum = () => {
    let sum = 0
    estimate().forEach((entry) => {
      if (entry.cost) sum += entry.cost
    })
    return sum
  }

  const submitStorage = () => {
    var flag = false
    storageData.forEach((storage) => {
      if (
        !(
          (storage.type === 'Magnetic Disk' &&
            storage.capacity >= 40 &&
            storage.capacity <= 2048) ||
          (storage.type === 'SSD' &&
            storage.capacity >= 20 &&
            storage.capacity <= 512)
        )
      ) {
        flag = true
      }
    })
    if (flag) {
      setModalprops({
        isModalOpen: true,
        heading: 'Warning',
        message:
          'For magnetic disk - minimum capacity 40 GB, maximum capacity 2048 GB. For SSD - minimum 20 GB, maximum 512 GB.',
        color: '#F1AB1E',
        onOK: clearModal,
        onCancel: clearModal,
      })
    } else {
      if (selectedNetwork < 512) {
        setModalprops({
          isModalOpen: true,
          heading: 'Warning',
          message: 'Network Bandwidth should have minimum of 512GB',
          color: '#F1AB1E',
          onOK: clearModal,
          onCancel: clearModal,
        })
      } else setActiveTab(tabs[tabs.indexOf(activeTab) + 1])
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>HVC</h1>
      </header>
      <main className='main-container'>
        <article className='article-container'>
          <div className='header-flex'>
            <h1 className='tab-header'>{activeTab}</h1>
            <div className='regions-dropdown'>
              <DropDown
                options={regions}
                onChange={(option) => setRegion(option)}
                selected={region}
                default='Regions'
              />
            </div>
          </div>
          <TabBar
            activeTab={activeTab}
            tabs={tabs}
            onClickonTab={(tab: string) => setActiveTab(tab)}
            enabledTabs={enabledTabs}
          />
          {activeTab === 'Choose Image' && (
            <Pages.PageImage
              region={region}
              onSelect={(image, version) => {
                selectImage(image, version)
              }}
              selectedImage={choosenImgId}
              selectedVersion={choosenImgVersion}
            />
          )}
          {activeTab === 'Choose Instance Type' && (
            <Pages.PageInstance
              selectedCore={selectedCore}
              selectedMem={selectedMem}
              setSelectedCore={(core) => setSelectedCore(core)}
              setSelectedMem={(mem) => setSelectedMem(mem)}
              onSelect={(inst) => selectInstance(inst)}
              selectdInstance={selectedInstance}
              setSelectedInstance={(inst) => {
                changeInst(inst)
              }}
            />
          )}
          {activeTab === 'Choose Storage and Network' && (
            <Pages.PageStorageNetwork
              initStorageData={storageData}
              onChangeStorageData={(storages) => {
                setStorageData(storages)
              }}
              choosenInstance={selectedInstance}
              network={selectedNetwork}
              selectNetwork={(network) => setSelectedNetwork(network)}
              onSubmit={() => {
                submitStorage()
              }}
            />
          )}
          {/* {activeTab==='Configure Security' && <Pages.PageSecurity />} */}
          {activeTab === 'Review & Launch' && (
            <Pages.PageReview
              imageId={choosenImgId}
              imageVersion={choosenImgVersion}
              selectedInstance={selectedInstance}
              selectedCore={selectedCore}
              selectedMemory={selectedMem}
              selectedStorage={storageData}
              selectedNetwork={selectedNetwork}
              setActiveTab={(tab) => setActiveTab(tab)}
            />
          )}
        </article>
        {/* storages={storageData} onChangeStorageData={(storagedata)=>{StorageData(storageData)}} */}
        <aside className='aside-container'>
          <div className='estimate-card'>
            <h2>Cost Estimates</h2>
            <div className='entries'>
              {estimate().map((item) => (
                <div className='entry' key={item.name}>
                  <h3>{item.name}</h3>
                  <h3 className='right'>$ {item.cost?.toFixed(2)}/mo</h3>
                </div>
              ))}
            </div>
            <h2 className='sum'>$ {sum().toFixed(2)}/mo</h2>
          </div>
        </aside>
      </main>
      {modalProps.isModalOpen && (
        <Modal
          isModalOpen={modalProps.isModalOpen}
          color={modalProps.color}
          heading={modalProps.heading}
          message={modalProps.message}
          onOK={modalProps.onOK}
          onCancel={modalProps.onCancel}
        />
      )}
    </div>
  )
}

interface ITabBar {
  activeTab: string
  tabs: string[]
  onClickonTab: (tab: string) => void
  enabledTabs: string[]
}

const TabBar: React.FC<ITabBar> = (props: ITabBar) => {
  return (
    <div className='tab-bar'>
      {props.tabs.map(
        (tab) => (
          <button
            className={`${tab === props.activeTab ? 'active tab' : 'tab'}`}
            onClick={() => props.onClickonTab(tab)}
            key={tab}>
            {tabs.indexOf(tab) + 1}. {tab}
          </button>
        )
        // {
        //   !props.enabledTabs[tabs.indexOf(tab)] &&
        //   <button className={`${tab===props.activeTab?'active tab': 'tab'}`}
        // onClick={()=>props.onClickonTab(tab)} disabled>{tabs.indexOf(tab)+1}. {tab}</button>
        // }
      )}
    </div>
  )
}

const Modal: React.FC<IModal> = (props: IModal) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <img
          src={crossIcon}
          alt='cross-icon'
          className='cross-icon'
          onClick={props.onCancel}
        />
        <h3
          style={{
            color: props.color,
          }}>
          {props.heading}
        </h3>
        <p>{props.message}</p>
        <div className='modal-footer'>
          <Button value='Cancel' color='black' onClick={props.onCancel} />
          <Button value='OK' color='#007EFE' onClick={props.onOK} />
        </div>
      </div>
    </div>
  )
}
export default App
