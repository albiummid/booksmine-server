const Department = require( "../models/department" );

exports.addSemester = async ( req, res, next ) =>
{
    const deptId = req.params.deptId;
    const { title, semesterCode } = req.body;
    const deptExists = await Department.findById( deptId )

    if ( !deptExists )
    {
        res.json( {
            success: false,
            msg: "Couldn't find exact department"
        } )
    }
    else
    {
        await deptExists.semesters.push( { title, semesterCode } );
        await deptExists.save( ( err, department ) =>
        {
            if ( err )
            {
                console.log( err );
            }
            else
            {
                res.status( 200 ).json( {
                    success: true,
                    msg: 'Semester successfully created.',
                    department

                } )
            }
        } )

    }

}

exports.updateSemester = async ( req, res, next ) =>
{
    const { deptId } = req.query;
    const { _id, title, semesterCode } = req.body;

    let deptExists = await Department.findById( deptId );

    if ( !deptExists )
    {
        res.json( {
            success: false,
            msg: "Something went wrong! couldn't find the department for update semesters !"
        } )
    }
    else
    {
        await deptExists.semesters.map( item =>
        {
            if ( item._id.toString() === _id )
            {
                item[ "title" ] = title;
                item[ "semesterCode" ] = semesterCode;
            }
            else
            {
                return item
            }
        } );

        deptExists.save( ( err, department ) =>
        {
            if ( !err )
            {
                res.status( 200 ).json( {
                    success: true,
                    msg: "Successfully updated semesters data.",
                    department
                } )
            }
            else
            {
                res.json( {
                    success: false,
                    msg: "Couldn't update semesters data"
                } )
            }
        } )
    }
}

exports.deleteSemester = async ( req, res, next ) =>
{
    const { deptId, semId } = req.query;
    let department = await Department.findById( deptId );
    const semIndex = await department.semesters?.findIndex( item => item._id.toString() === semId );
    if ( semIndex > -1 )
    {
        // delete from array
        await department.semesters.splice( semIndex, 1 );

        department.save( ( err, doc ) =>
        {
            res.json( {
                success: true,
                msg: "Successfully Deleted.",
                department: doc,
            } )
        } );
    }
    else
    {
        res.json( {
            success: false,
            msg: "Something went wrong! Didn't find the data"
        } )
    }


}