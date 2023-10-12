
"use client"

import * as z from "zod"
import axios from 'axios'
import MuxPlayer from '@mux/mux-player-react'
import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Chapter, MuxData } from "@prisma/client"
import Image from "next/image"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"

interface ChapterVideoFormProps {
    initialData: Chapter & {muxData?: MuxData | null}
    courseId: string
    chapterId : string
}

const formSchema = z.object({
    videoURL: z.string().min(1)
})

const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterVideoFormProps) => {

    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)




    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
            toast.success("Chapter updated")
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }


    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Video
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.videoURL && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a video
                        </>
                    )}
                    {!isEditing && initialData.videoURL && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit video
                        </>
                    )}

                </Button>
            </div>
            {!isEditing && (
                !initialData.videoURL ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <Video className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <MuxPlayer
                                playbackId={initialData?.muxData?.playbackId || ""}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoURL: url })
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                       Upload this chapter&apos;s video
                    </div>
                </div>
            )
            }
            {
                initialData.videoURL && !isEditing && (
                    <div className="text-xs text-muted mt-2">
                        Videos can take a few minutes to process. Refresh the page if
                        video does not appear
                    </div>
                )
            }
        </div>
    )
}

export default ChapterVideoForm