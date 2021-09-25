// remove owner id - it's not needed
export interface Box{
    id:number,
    ownerId:string,
    status:boolean,
    ownerAvatar:string,
    position:[
        left:{
            status:boolean,
            ownerId:string
        },
        right:{
            status:boolean,
            ownerId:string
        },
        top:{
            status:boolean,
            ownerId:string
        },
        bottom:{
            status:boolean,
            ownerId:string
        }
    ]
}