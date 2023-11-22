import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Group } from '../GroupTypes'
import { useGroupsContext } from '../GroupsProvider'
import { TimelineModel } from '@/Components/Timeline/TimelineProvider/types'
import TimelineService from '@/Components/Timeline/TimelineProvider/TimelineService'
import { useSingleTimelineContext } from '@/Components/Timeline/TimelineProvider/SingleTimelineProvider'

type GroupOption = {
    label: string
    group: Group
}

type Props = {
    timeline: TimelineModel
}

export default function GroupSearch({ timeline }: Props) {
    const { groups } = useGroupsContext()
    const { setTimeline } = useSingleTimelineContext()

    const getDefaultValue = () => {
        if (timeline.group === null) {
            return null
        }
        return {
            label: timeline.group.name,
            group: timeline.group,
        }
    }

    const mapGroupsToOption = (): Array<GroupOption> => {
        return groups.map((group) => {
            return {
                label: group.name,
                group: group,
            }
        })
    }

    const handleValueChange = async (newValue: GroupOption) => {
        if (newValue !== undefined)
            await TimelineService.setAllowedToBrowseGroup({
                groupId: newValue?.group.id,
                timelineId: timeline.id,
            })
        const permissionGroup = groups.filter(
            (value) => value.id === newValue.group.id
        )
        if (permissionGroup.length > 0) {
            const thisGroup = permissionGroup.at(0)
            if (thisGroup !== undefined) {
                const updatedTimeline = { ...timeline }
                updatedTimeline.group = thisGroup
                setTimeline(updatedTimeline)
            }
        }
    }

    return (
        <Autocomplete
            disablePortal
            id="groups-search"
            options={mapGroupsToOption()}
            onChange={(event: any, newValue: any) => {
                handleValueChange(newValue)
            }}
            defaultValue={getDefaultValue()}
            sx={{ width: 400 }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose group with browse permission"
                />
            )}
        />
    )
}
