[indent=4]
namespace Bosco.ECS

    exception Exception
        ECS // the exception


    exception EcsException 
        EntityIsNotEnabled
        EntityAlreadyHasComponent
        EntityDoesNotHaveComponent
        EntityIsAlreadyReleased
        SingleEntity
        Matcher
        WorldDoesNotContainEntity
