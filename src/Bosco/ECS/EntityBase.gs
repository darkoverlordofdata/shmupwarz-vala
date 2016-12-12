[indent=4]
/**
 * Base class for Entitities
 */
namespace Bosco.ECS


    class abstract EntityBase : DarkMatter

        /**
         * @static
         * @type number */
        instanceIndex : static int = 0

        /**
         * @static
         * @type number */
        size : static int = 0

        /**
         * A unique sequential index number assigned to each entity at creation
         * @type number
         * @name entitas.Entity#creationIndex */
        prop readonly creationIndex : int

        /**
         * Entity name
         * @type string */
        prop readonly name : string

        /**
         *    Entity Id
         * @type string */
        prop readonly id : string

        prop readonly isEnabled : bool

        prop readonly refCount : int


        /**
         * Subscribe to Entity Released Event
         * @type entitas.ISignal */
        prop readonly onEntityReleased : EntityReleased

        /**
         * Subscribe to Component Added Event
         * @type entitas.ISignal */
        prop readonly onComponentAdded : EntityChanged

        /**
         * Subscribe to Component Removed Event
         * @type entitas.ISignal */
        prop readonly onComponentRemoved : EntityChanged

        /**
         * Subscribe to Component Replaced Event
         * @type entitas.ISignal */
        prop readonly onComponentReplaced : ComponentReplaced

        first : static bool = true
        maxEntities : static int = 128
        incEntities : static int = 64
        db_index : static int = 0
        db_id : int = 0
        ic : int = 0
        _components : static array of IComponent

        _world : World
        _toStringCache : string
        _componentsCache : array of IComponent
        _componentIndicesCache : array of int
        _componentsEnum : unowned array of string
        _totalComponents : int
        _componentCount : int

        /**
         * The basic game object. Everything is an entity with components that
         * are added / removed as needed.
         *
         * @param Object componentsEnum
         * @param number totalComponents
         * @constructor
         */
        construct(componentsEnum : array of string, totalComponents : int = 32)

            _totalComponents = totalComponents
            _componentCount = componentsEnum.length

            if first
                _components = new array of IComponent[_componentCount * maxEntities]
                first = false

            if db_index >= maxEntities
                maxEntities += incEntities
                _components.resize(_componentCount * maxEntities)

            db_id = db_index++
            ic = db_id * _componentCount

            _onEntityReleased = new EntityReleased()
            _onComponentAdded = new EntityChanged()
            _onComponentRemoved = new EntityChanged()
            _onComponentReplaced = new ComponentReplaced()
            _componentIndicesCache = new array of int[totalComponents]
            _componentsEnum = componentsEnum
            _world = World.instance


        /**
         * Initialize the entity after allocation from the pool
         *
         * @param string  name
         * @param string  id
         * @param int creationIndex
         */
        def initialize(name : string, id : string, creationIndex : int)
            _name = name
            _creationIndex = creationIndex
            _isEnabled = true
            _id = id
            addRef()

         /**
          * AddComponent
          *
          * @param number index
          * @param entitas.IComponent component
          * @returns entitas.Entity
          */
        def addComponent(index : int, component : IComponent) : Entity raises EcsException
            if !_isEnabled
                raise new EcsException.EntityIsNotEnabled("Cannot add component!")

            if hasComponent(index)
                raise new EcsException.EntityAlreadyHasComponent("Cannot add %s at index %d", _componentsEnum[index], index)

            _components[ic+index] = component
            _componentsCache = null
            _componentIndicesCache = null
            _toStringCache = null
            _onComponentAdded.dispatch((Entity)this, index, component)
            return (Entity)this

        /**
         * RemoveComponent
         *
         * @param number index
         * @returns entitas.Entity
         */
        def removeComponent(index : int) : Entity raises EcsException
            if !_isEnabled
                raise new EcsException.EntityIsNotEnabled("Cannot remove component!")

            if !hasComponent(index)
                raise new EcsException.EntityDoesNotHaveComponent("Cannot remove %s at index %d", _componentsEnum[index], index)

            _replaceComponent(index, null)
            return (Entity)this

        /**
         * ReplaceComponent
         *
         * @param number index
         * @param entitas.IComponent component
         * @returns entitas.Entity
         */
        def replaceComponent(index : int, component : IComponent) : Entity raises EcsException
            if !_isEnabled
                raise new EcsException.EntityIsNotEnabled("Cannot replace component!")

            if hasComponent(index)
                _replaceComponent(index, component)
             else if component != null
                addComponent(index, component)

            return (Entity)this


        def _replaceComponent(index : int, replacement : IComponent?)
            var previousComponent = _components[ic+index]
            if previousComponent == replacement
                _onComponentReplaced.dispatch((Entity)this, index, previousComponent, replacement)
             else
                _components[ic+index] = replacement
                _componentsCache = null
                if replacement == null
                    _components[ic+index] = null
                    _componentIndicesCache = null
                    _toStringCache = null
                    _onComponentRemoved.dispatch((Entity)this, index, previousComponent)

                 else
                    _onComponentReplaced.dispatch((Entity)this, index, previousComponent, replacement)

        /**
         * GetComponent
         *
         * @param number index
         * @param entitas.IComponent component
         */
        def getComponent(index : int) : unowned IComponent raises EcsException
            if !hasComponent(index)
                raise new EcsException.EntityDoesNotHaveComponent("Cannot get %s at index %d", _componentsEnum[index], index)

            return _components[ic+index]

        /**
         * GetComponents
         *
         * @returns Array<entitas.IComponent>
         */
        def getComponents() : array of IComponent
            if _componentsCache == null
                var components = new array of IComponent[0]
                //for var component in _components
                for var i = ic to (ic+_componentCount-1)
                    if _components[i] != null
                        components+= _components[i]
                _componentsCache = components
            return _componentsCache

        /**
         * GetComponentIndices
         *
         * @returns Array<number>
         */
        def getComponentIndices() : array of int
            if _componentIndicesCache == null
                var indices = new array of int[0]
                var index = 0
                for var i = ic to (ic+_componentCount-1)
                    if _components[i] != null
                        indices+= index
                    index++
                _componentIndicesCache = indices
            return _componentIndicesCache

         /**
          * HasComponent
          *
          * @param number index
          * @returns boolean
          */
        def hasComponent(index : int) : bool
            return _components[ic+index] != null

        /**
         * HasComponents
         *
         * @param Array<number> indices
         * @returns boolean
         */
        def hasComponents(indices : array of int) : bool
            for var index in indices
                if _components[ic+index] == null
                    return false
            return true

        /**
         * HasAnyComponent
         *
         * @param Array<number> indices
         * @returns boolean
         */
        def hasAnyComponent(indices : array of int) : bool
            for var index in indices
                if _components[ic+index] != null
                    return true
            return false

        /**
         * RemoveAllComponents
         *
         */
        def removeAllComponents()
            _toStringCache = ""
            var index = 0
            for var i = ic to (ic+_componentCount-1)
                if _components[i] != null
                    _replaceComponent(index, null)
                index++

        /**
         * Destroy
         *
         */
        def destroy()
            removeAllComponents()
            _onComponentAdded.clear()
            _onComponentReplaced.clear()
            _onComponentRemoved.clear()
            _isEnabled = false


        /**
         * ToString
         *
         * @returns string
         */
        def toString() : string
            if _toStringCache == null
                var sb = new StringBuilder()
                var seperator = ", "

                var components = getComponentIndices()
                var lastSeperator = components.length - 1
                for var i = 0 to (lastSeperator)
                    sb.append(_componentsEnum[components[i]].replace("Component", ""))
                    if i < lastSeperator
                        sb.append(seperator)
                _toStringCache = sb.str
            return _toStringCache

        /**
         * AddRef
         *
         * @returns entitas.Entity
         */
        def addRef() : Entity
            _refCount += 1
            return (Entity)this


        /**
         * Release
         *
         */
        def release() raises EcsException
            _refCount -= 1
            if _refCount == 0
                _onEntityReleased.dispatch((Entity)this)
            else if _refCount < 0
                raise new EcsException.EntityIsAlreadyReleased("%s:%s", id, name)
