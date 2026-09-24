export interface ArtifactFile{
 
    name:string,
    content:string

}

export interface Artifact {
    id:number,
    type:string,
    title:string,
    files:ArtifactFile[]
}