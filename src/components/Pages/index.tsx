import * as React from 'react'
import './styles.scss'
import { images } from './../../constants/constants'
import { instances } from './../../constants/constants'
import { ImageCard } from './../ImageCard'
import { Button } from './../Button'
import { ImageDetails } from './../ImageCard'
import { DropDown } from '../DropDown'
import crossIcon from './../../assets/cross.svg'

interface IPageImage {
  onSelect: (imageId: string, version: string) => void
  region: string
  selectedImage: string
  selectedVersion: string
}

export const PageImage: React.FC<IPageImage> = (props: IPageImage) => {
  return (
    <div className='page card-list'>
      {images.map(
        (image) =>
          (props.region === 'us-east-1' ||
            props.region === 'us-east-2' ||
            image.id !== 'microsoft-windows') &&
          (props.selectedImage === image.id ? (
            <ImageCard
              image={image}
              onSelect={(version) => {
                props.onSelect(image.id, version)
              }}
              version={props.selectedVersion}
              isImgselected={true}
              change={true}
              key={image.id}
            />
          ) : (
            <ImageCard
              image={image}
              onSelect={(version) => {
                props.onSelect(image.id, version)
              }}
              version={props.selectedVersion}
              isImgselected={false}
              change={true}
              key={image.id}
            />
          ))
      )}
    </div>
  )
}

interface ITabBar {
  activeTab: string
  tabs: string[]
  onClickonTab: (tab: string) => void
}

const TabBar: React.FC<ITabBar> = (props: ITabBar) => {
  return (
    <div className='btn-bar'>
      {props.tabs.map((tab) => (
        <button
          className={`${tab === props.activeTab ? 'active btn' : 'btn'}`}
          onClick={() => props.onClickonTab(tab)}
          key={tab}>
          {tab}
        </button>
      ))}
    </div>
  )
}

interface IPageInstance {
  selectedCore: string
  selectedMem: string
  selectdInstance: string
  setSelectedCore: (core: string) => void
  setSelectedMem: (core: string) => void
  setSelectedInstance: (inst: string) => void
  onSelect: (inst: string) => void
}

export const PageInstance: React.FC<IPageInstance> = (props: IPageInstance) => {
  const tabs = instances.map((instance) => instance.name)
  // const [activeTab,setActiveTab] = React.useState(tabs[0]);

  let coreOptions: string[] = []
  instances.forEach((instance) => {
    if (instance.name === props.selectdInstance) {
      coreOptions = instance.core.map((core) => core.name)
    }
  })

  let memOptions: string[] = []
  instances.forEach((instance) => {
    if (instance.name === props.selectdInstance) {
      memOptions = instance.memory.map((memory) => memory.name)
    }
  })

  const selectInstance = () => {
    props.onSelect(props.selectdInstance)
  }

  return (
    <div className='page'>
      <div className='row'>
        <TabBar
          tabs={tabs}
          activeTab={props.selectdInstance}
          onClickonTab={(tab) => props.setSelectedInstance(tab)}
        />
      </div>
      <div className='row'>
        <DropDown
          options={coreOptions}
          selected={props.selectedCore}
          onChange={(option) => props.setSelectedCore(option)}
          default='CPU Core'
        />
        <DropDown
          options={memOptions}
          selected={props.selectedMem}
          onChange={(option) => props.setSelectedMem(option)}
          default='Memory'
        />
      </div>
      <Button color='#007EFE' onClick={selectInstance} value='Submit' />
    </div>
  )
}

export interface StorageDetails {
  type: string
  volume: string
  capacity: number
  encryption: boolean
  iops: number
  backup: boolean
  remarks: string
  cost: number
}

interface IPageStorageNetwork {
  initStorageData: StorageDetails[]
  onChangeStorageData: (storagedata: StorageDetails[]) => void
  choosenInstance: string
  network: number
  selectNetwork: (network: number) => void
  onSubmit: () => void
}

export const PageStorageNetwork: React.FC<IPageStorageNetwork> = (
  props: IPageStorageNetwork
) => {
  const changeType = (ind: number, option: string) => {
    let newStorages = [...storageData]
    newStorages[ind].type = option
    setStorageData(newStorages)
    props.onChangeStorageData(newStorages)
  }
  const changeCapacity = (ind: number, capacity: number) => {
    let newStorages = [...storageData]
    newStorages[ind].capacity = capacity
    newStorages[ind].iops = capacity < 100 ? 100 : capacity <= 500 ? 600 : 1000
    setStorageData(newStorages)
    props.onChangeStorageData(newStorages)
  }
  const changeEncryption = (ind: number, encryption: boolean) => {
    let newStorages = [...storageData]
    newStorages[ind].encryption = encryption
    setStorageData(newStorages)
    props.onChangeStorageData(newStorages)
  }
  const changeBackup = (ind: number, backup: boolean) => {
    let newStorages = [...storageData]
    newStorages[ind].backup = backup
    setStorageData(newStorages)
    props.onChangeStorageData(newStorages)
  }
  const changeRemarks = (ind: number, remarks: string) => {
    let newStorages = [...storageData]
    newStorages[ind].remarks = remarks
    setStorageData(newStorages)
    props.onChangeStorageData(newStorages)
  }

  const [storageData, setStorageData] = React.useState(props.initStorageData)

  const addStorage = () => {
    let newStorages = [...storageData]
    newStorages.push({
      type: 'Magnetic Disk',
      volume: 'Ext',
      capacity: 0,
      encryption: false,
      iops: 100,
      backup: false,
      remarks: '',
      cost: 0,
    })
    setStorageData(newStorages)
    props.onChangeStorageData(newStorages)
  }

  const deleteStorage = (ind: number) => {
    let newStorages = [...storageData]
    newStorages.splice(ind, 1)
    setStorageData(newStorages)
    props.onChangeStorageData(newStorages)
  }

  return (
    <div>
      <div className='storage-card-list'>
        {storageData.map((storage) => (
          <div className='card-row' key={storageData.indexOf(storage)}>
            <div className='storage-card'>
              <div>
                <h3>Type</h3>
                <DropDown
                  options={['Magnetic Disk', 'SSD']}
                  selected={storage.type}
                  onChange={(option) => {
                    changeType(storageData.indexOf(storage), option)
                  }}
                />
              </div>
              <div>
                <h3>Volume</h3>
                {storage.volume}
              </div>
              <div>
                <h3>Capacity(GB)</h3>
                <input
                  type='number'
                  value={storage.capacity}
                  onChange={(event) => {
                    changeCapacity(
                      storageData.indexOf(storage),
                      parseInt(event.target.value)
                    )
                  }}
                />
              </div>
              <div>
                <h3>Encryption</h3>
                {storage.encryption ? (
                  <input
                    type='checkbox'
                    onChange={(event) => {
                      changeEncryption(
                        storageData.indexOf(storage),
                        event.target.checked
                      )
                    }}
                    checked
                  />
                ) : (
                  <input
                    type='checkbox'
                    onChange={(event) => {
                      changeEncryption(
                        storageData.indexOf(storage),
                        event.target.checked
                      )
                    }}
                  />
                )}
              </div>
              <div>
                <h3>IOPS</h3>
                <span>{storage.iops}</span>
              </div>
              <div>
                <h3>Backup Required</h3>
                {storage.backup ? (
                  <input
                    type='checkbox'
                    onChange={(event) => {
                      changeBackup(
                        storageData.indexOf(storage),
                        event.target.checked
                      )
                    }}
                    checked
                  />
                ) : (
                  <input
                    type='checkbox'
                    onChange={(event) => {
                      changeBackup(
                        storageData.indexOf(storage),
                        event.target.checked
                      )
                    }}
                  />
                )}
              </div>
              <div>
                <h3>Remarks</h3>
                <input
                  type='text'
                  value={storage.remarks}
                  onChange={(event) => {
                    changeRemarks(
                      storageData.indexOf(storage),
                      event.target.value
                    )
                  }}
                />
              </div>
            </div>
            {storageData.indexOf(storage) !== 0 ? (
              <div className='close-btn'>
                <img
                  src={crossIcon}
                  alt='cross-icon'
                  className='cross-icon'
                  onClick={() => deleteStorage(storageData.indexOf(storage))}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
      <div>
        <Button value='Add Storage' color='#A0A4A8' onClick={addStorage} />
      </div>
      <h2>Network Bandwidth Configuration</h2>
      {props.choosenInstance === 'Network Optimised' ? (
        <div>
          512GB
          <input
            type='range'
            min={512}
            max={2048}
            value={props.network}
            className='slider'
            onChange={(event) =>
              props.selectNetwork(parseInt(event.target.value))
            }
          />
          2TB
        </div>
      ) : (
        <div>
          512GB
          <input
            type='range'
            min={512}
            max={1024}
            value={props.network}
            className='slider'
            onChange={(event) =>
              props.selectNetwork(parseInt(event.target.value))
            }
          />
          1TB
        </div>
      )}
      <h3>{props.network}GB</h3>
      <Button
        value='Submit'
        onClick={() => {
          props.onSubmit()
        }}
        color='blue'
      />
    </div>
  )
}

interface IPageReview {
  imageId: string
  imageVersion: string
  selectedInstance: string
  selectedCore: string
  selectedMemory: string
  selectedStorage: StorageDetails[]
  selectedNetwork: number

  setActiveTab: (tab: string) => void
}

export const PageReview: React.FC<IPageReview> = (props: IPageReview) => {
  interface Data {
    image?: ImageDetails
    instance?: { core: {} }
    storages?: StorageDetails[]
    network?: { value: number; cost: number }
  }
  let data: Data = {}
  let image: ImageDetails = images[0]
  images.forEach((i) => {
    if (i.id === props.imageId) {
      image = { ...i }
      data.image = { ...i }
      data.image.version = props.imageVersion
      //   delete data.image.versions
    }
  })
  instances.forEach((instance) => {
    if (instance.name === props.selectedInstance) {
      let i = { core: {} }
      let j = { memory: {} }
      instance.core.forEach((c) => {
        if (c.name === props.selectedCore) {
          i.core = c
        }
      })
      instance.memory.forEach((m) => {
        if (m.name === props.selectedMemory) {
          j.memory = m
        }
      })
      data.instance = { ...instance, ...i, ...j }
    }
  })
  data.storages = props.selectedStorage
  let cost = 0
  if (props.selectedNetwork >= 512 && props.selectedNetwork < 1024) cost = 5
  if (props.selectedNetwork >= 1024 && props.selectedNetwork < 1536) cost = 10
  if (props.selectedNetwork >= 1536 && props.selectedNetwork <= 2048) cost = 15
  data.network = { value: props.selectedNetwork, cost: cost }
  var dataString =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
  return (
    <div className='page card-list'>
      <a href={dataString} download='data.json'>
        <Button color='#007EFE' value='Generate JSON' onClick={() => {}} />
      </a>
      {data.image && (
        <div>
          <span
            className='edit-btn'
            onClick={() => props.setActiveTab('Choose Image')}>
            EDIT
          </span>
          <h1>Image</h1>

          <ImageCard
            image={image}
            onSelect={() => {}}
            version={props.imageVersion}
            change={false}
          />
        </div>
      )}
      {props.selectedInstance && props.selectedCore && props.selectedMemory && (
        <div>
          <span
            className='edit-btn'
            onClick={() => props.setActiveTab('Choose Instance Type')}>
            EDIT
          </span>
          <h1>Instance Type</h1>
          <div className='gen-card'>
            <h3>{props.selectedInstance}</h3>
            <h4>{props.selectedCore}</h4>
            <h4>{props.selectedMemory}</h4>
          </div>
        </div>
      )}
      <div>
        <span
          className='edit-btn'
          onClick={() => props.setActiveTab('Choose Storage and Network')}>
          EDIT
        </span>
        <h1>Bandwidth</h1>
        <div className='gen-card'>
          <h3>{props.selectedNetwork}GB/Month</h3>
        </div>
      </div>
      <div>
        <span
          className='edit-btn'
          onClick={() => props.setActiveTab('Choose Storage and Network')}>
          EDIT
        </span>
        <h1>Storage</h1>
        <div className='storage-card-list'>
          <div className='card-row'>
            {props.selectedStorage.map((storage) => (
              <div
                className='storage-card'
                key={props.selectedStorage.indexOf(storage)}>
                <div>
                  <h3>Type</h3>
                  <DropDown
                    options={[storage.type]}
                    selected={storage.type}
                    onChange={(option) => {}}
                  />
                </div>
                <div>
                  <h3>Volume</h3>
                  {storage.volume}
                </div>
                <div>
                  <h3>Capacity(GB)</h3>
                  <input
                    type='number'
                    value={storage.capacity}
                    onChange={(event) => {}}
                    disabled
                  />
                </div>
                <div>
                  <h3>Encryption</h3>
                  {storage.encryption ? (
                    <input
                      type='checkbox'
                      onChange={(event) => {}}
                      checked
                      disabled
                    />
                  ) : (
                    <input type='checkbox' onChange={(event) => {}} disabled />
                  )}
                </div>
                <div>
                  <h3>IOPS</h3>
                  <span>{storage.iops}</span>
                </div>
                <div>
                  <h3>Backup Required</h3>
                  {storage.backup ? (
                    <input
                      type='checkbox'
                      onChange={(event) => {}}
                      checked
                      disabled
                    />
                  ) : (
                    <input type='checkbox' onChange={(event) => {}} disabled />
                  )}
                </div>
                <div>
                  <h3>Remarks</h3>
                  <input
                    type='text'
                    value={storage.remarks}
                    onChange={(event) => {}}
                    disabled
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
