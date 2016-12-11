/* ComponentReplaced.c generated by valac 0.34.4, the Vala compiler
 * generated from ComponentReplaced.gs, do not modify */


#include <glib.h>
#include <glib-object.h>
#include <gee.h>
#include <gobject/gvaluecollector.h>


#define TYPE_DARK_MATTER (dark_matter_get_type ())
#define DARK_MATTER(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_DARK_MATTER, DarkMatter))
#define DARK_MATTER_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_DARK_MATTER, DarkMatterClass))
#define IS_DARK_MATTER(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_DARK_MATTER))
#define IS_DARK_MATTER_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_DARK_MATTER))
#define DARK_MATTER_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_DARK_MATTER, DarkMatterClass))

typedef struct _DarkMatter DarkMatter;
typedef struct _DarkMatterClass DarkMatterClass;

#define BOSCO_ECS_TYPE_ENTITY_BASE (bosco_ecs_entity_base_get_type ())
#define BOSCO_ECS_ENTITY_BASE(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), BOSCO_ECS_TYPE_ENTITY_BASE, BoscoECSEntityBase))
#define BOSCO_ECS_ENTITY_BASE_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), BOSCO_ECS_TYPE_ENTITY_BASE, BoscoECSEntityBaseClass))
#define BOSCO_ECS_IS_ENTITY_BASE(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), BOSCO_ECS_TYPE_ENTITY_BASE))
#define BOSCO_ECS_IS_ENTITY_BASE_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), BOSCO_ECS_TYPE_ENTITY_BASE))
#define BOSCO_ECS_ENTITY_BASE_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), BOSCO_ECS_TYPE_ENTITY_BASE, BoscoECSEntityBaseClass))

typedef struct _BoscoECSEntityBase BoscoECSEntityBase;
typedef struct _BoscoECSEntityBaseClass BoscoECSEntityBaseClass;

#define BOSCO_ECS_TYPE_ENTITY (bosco_ecs_entity_get_type ())
#define BOSCO_ECS_ENTITY(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), BOSCO_ECS_TYPE_ENTITY, BoscoECSEntity))
#define BOSCO_ECS_ENTITY_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), BOSCO_ECS_TYPE_ENTITY, BoscoECSEntityClass))
#define BOSCO_ECS_IS_ENTITY(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), BOSCO_ECS_TYPE_ENTITY))
#define BOSCO_ECS_IS_ENTITY_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), BOSCO_ECS_TYPE_ENTITY))
#define BOSCO_ECS_ENTITY_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), BOSCO_ECS_TYPE_ENTITY, BoscoECSEntityClass))

typedef struct _BoscoECSEntity BoscoECSEntity;
typedef struct _BoscoECSEntityClass BoscoECSEntityClass;

#define BOSCO_ECS_TYPE_ICOMPONENT (bosco_ecs_icomponent_get_type ())
#define BOSCO_ECS_ICOMPONENT(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), BOSCO_ECS_TYPE_ICOMPONENT, BoscoECSIComponent))
#define BOSCO_ECS_IS_ICOMPONENT(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), BOSCO_ECS_TYPE_ICOMPONENT))
#define BOSCO_ECS_ICOMPONENT_GET_INTERFACE(obj) (G_TYPE_INSTANCE_GET_INTERFACE ((obj), BOSCO_ECS_TYPE_ICOMPONENT, BoscoECSIComponentIface))

typedef struct _BoscoECSIComponent BoscoECSIComponent;
typedef struct _BoscoECSIComponentIface BoscoECSIComponentIface;

#define BOSCO_ECS_TYPE_COMPONENT_REPLACED (bosco_ecs_component_replaced_get_type ())
#define BOSCO_ECS_COMPONENT_REPLACED(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), BOSCO_ECS_TYPE_COMPONENT_REPLACED, BoscoECSComponentReplaced))
#define BOSCO_ECS_COMPONENT_REPLACED_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), BOSCO_ECS_TYPE_COMPONENT_REPLACED, BoscoECSComponentReplacedClass))
#define BOSCO_ECS_IS_COMPONENT_REPLACED(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), BOSCO_ECS_TYPE_COMPONENT_REPLACED))
#define BOSCO_ECS_IS_COMPONENT_REPLACED_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), BOSCO_ECS_TYPE_COMPONENT_REPLACED))
#define BOSCO_ECS_COMPONENT_REPLACED_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), BOSCO_ECS_TYPE_COMPONENT_REPLACED, BoscoECSComponentReplacedClass))

typedef struct _BoscoECSComponentReplaced BoscoECSComponentReplaced;
typedef struct _BoscoECSComponentReplacedClass BoscoECSComponentReplacedClass;
typedef struct _BoscoECSComponentReplacedPrivate BoscoECSComponentReplacedPrivate;

#define BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER (bosco_ecs_component_replaced_listener_get_type ())
#define BOSCO_ECS_COMPONENT_REPLACED_LISTENER(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER, BoscoECSComponentReplacedListener))
#define BOSCO_ECS_COMPONENT_REPLACED_LISTENER_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER, BoscoECSComponentReplacedListenerClass))
#define BOSCO_ECS_COMPONENT_REPLACED_IS_LISTENER(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER))
#define BOSCO_ECS_COMPONENT_REPLACED_IS_LISTENER_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER))
#define BOSCO_ECS_COMPONENT_REPLACED_LISTENER_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER, BoscoECSComponentReplacedListenerClass))

typedef struct _BoscoECSComponentReplacedListener BoscoECSComponentReplacedListener;
typedef struct _BoscoECSComponentReplacedListenerClass BoscoECSComponentReplacedListenerClass;
#define _g_object_unref0(var) ((var == NULL) ? NULL : (var = (g_object_unref (var), NULL)))
#define _bosco_ecs_component_replaced_listener_unref0(var) ((var == NULL) ? NULL : (var = (bosco_ecs_component_replaced_listener_unref (var), NULL)))
typedef struct _BoscoECSComponentReplacedListenerPrivate BoscoECSComponentReplacedListenerPrivate;
typedef struct _BoscoECSComponentReplacedParamSpecListener BoscoECSComponentReplacedParamSpecListener;
typedef struct _BoscoECSParamSpecComponentReplaced BoscoECSParamSpecComponentReplaced;

struct _BoscoECSIComponentIface {
	GTypeInterface parent_iface;
};

typedef void (*BoscoECSOnComponentReplaced) (BoscoECSEntity* e, gint index, BoscoECSIComponent* component, BoscoECSIComponent* replacement, void* user_data);
struct _BoscoECSComponentReplaced {
	GTypeInstance parent_instance;
	volatile int ref_count;
	BoscoECSComponentReplacedPrivate * priv;
};

struct _BoscoECSComponentReplacedClass {
	GTypeClass parent_class;
	void (*finalize) (BoscoECSComponentReplaced *self);
};

struct _BoscoECSComponentReplacedPrivate {
	GeeArrayList* _listeners;
};

struct _BoscoECSComponentReplacedListener {
	GTypeInstance parent_instance;
	volatile int ref_count;
	BoscoECSComponentReplacedListenerPrivate * priv;
};

struct _BoscoECSComponentReplacedListenerClass {
	GTypeClass parent_class;
	void (*finalize) (BoscoECSComponentReplacedListener *self);
};

struct _BoscoECSComponentReplacedListenerPrivate {
	BoscoECSOnComponentReplaced _event;
	gpointer _event_target;
};

struct _BoscoECSComponentReplacedParamSpecListener {
	GParamSpec parent_instance;
};

struct _BoscoECSParamSpecComponentReplaced {
	GParamSpec parent_instance;
};


static gpointer bosco_ecs_component_replaced_parent_class = NULL;
static gpointer bosco_ecs_component_replaced_listener_parent_class = NULL;

gpointer dark_matter_ref (gpointer instance);
void dark_matter_unref (gpointer instance);
GParamSpec* param_spec_dark_matter (const gchar* name, const gchar* nick, const gchar* blurb, GType object_type, GParamFlags flags);
void value_set_dark_matter (GValue* value, gpointer v_object);
void value_take_dark_matter (GValue* value, gpointer v_object);
gpointer value_get_dark_matter (const GValue* value);
GType dark_matter_get_type (void) G_GNUC_CONST;
GType bosco_ecs_entity_base_get_type (void) G_GNUC_CONST;
GType bosco_ecs_entity_get_type (void) G_GNUC_CONST;
GType bosco_ecs_icomponent_get_type (void) G_GNUC_CONST;
gpointer bosco_ecs_component_replaced_ref (gpointer instance);
void bosco_ecs_component_replaced_unref (gpointer instance);
GParamSpec* bosco_ecs_param_spec_component_replaced (const gchar* name, const gchar* nick, const gchar* blurb, GType object_type, GParamFlags flags);
void bosco_ecs_value_set_component_replaced (GValue* value, gpointer v_object);
void bosco_ecs_value_take_component_replaced (GValue* value, gpointer v_object);
gpointer bosco_ecs_value_get_component_replaced (const GValue* value);
GType bosco_ecs_component_replaced_get_type (void) G_GNUC_CONST;
gpointer bosco_ecs_component_replaced_listener_ref (gpointer instance);
void bosco_ecs_component_replaced_listener_unref (gpointer instance);
GParamSpec* bosco_ecs_component_replaced_param_spec_listener (const gchar* name, const gchar* nick, const gchar* blurb, GType object_type, GParamFlags flags);
void bosco_ecs_component_replaced_value_set_listener (GValue* value, gpointer v_object);
void bosco_ecs_component_replaced_value_take_listener (GValue* value, gpointer v_object);
gpointer bosco_ecs_component_replaced_value_get_listener (const GValue* value);
GType bosco_ecs_component_replaced_listener_get_type (void) G_GNUC_CONST;
#define BOSCO_ECS_COMPONENT_REPLACED_GET_PRIVATE(o) (G_TYPE_INSTANCE_GET_PRIVATE ((o), BOSCO_ECS_TYPE_COMPONENT_REPLACED, BoscoECSComponentReplacedPrivate))
enum  {
	BOSCO_ECS_COMPONENT_REPLACED_DUMMY_PROPERTY
};
void bosco_ecs_component_replaced_add (BoscoECSComponentReplaced* self, BoscoECSOnComponentReplaced event, void* event_target);
BoscoECSComponentReplacedListener* bosco_ecs_component_replaced_listener_new (BoscoECSOnComponentReplaced event, void* event_target);
BoscoECSComponentReplacedListener* bosco_ecs_component_replaced_listener_construct (GType object_type, BoscoECSOnComponentReplaced event, void* event_target);
void bosco_ecs_component_replaced_remove (BoscoECSComponentReplaced* self, BoscoECSOnComponentReplaced event, void* event_target);
BoscoECSOnComponentReplaced bosco_ecs_component_replaced_listener_get_event (BoscoECSComponentReplacedListener* self, gpointer* result_target);
void bosco_ecs_component_replaced_clear (BoscoECSComponentReplaced* self);
void bosco_ecs_component_replaced_dispatch (BoscoECSComponentReplaced* self, BoscoECSEntity* e, gint index, BoscoECSIComponent* component, BoscoECSIComponent* replacement);
BoscoECSComponentReplaced* bosco_ecs_component_replaced_new (void);
BoscoECSComponentReplaced* bosco_ecs_component_replaced_construct (GType object_type);
#define BOSCO_ECS_COMPONENT_REPLACED_LISTENER_GET_PRIVATE(o) (G_TYPE_INSTANCE_GET_PRIVATE ((o), BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER, BoscoECSComponentReplacedListenerPrivate))
enum  {
	BOSCO_ECS_COMPONENT_REPLACED_LISTENER_DUMMY_PROPERTY
};
void bosco_ecs_component_replaced_listener_set_event (BoscoECSComponentReplacedListener* self, BoscoECSOnComponentReplaced value, gpointer value_target);
static void bosco_ecs_component_replaced_listener_finalize (BoscoECSComponentReplacedListener* obj);
static void bosco_ecs_component_replaced_finalize (BoscoECSComponentReplaced* obj);


void bosco_ecs_component_replaced_add (BoscoECSComponentReplaced* self, BoscoECSOnComponentReplaced event, void* event_target) {
	GeeArrayList* _tmp0_ = NULL;
	BoscoECSOnComponentReplaced _tmp1_ = NULL;
	void* _tmp1__target = NULL;
	BoscoECSComponentReplacedListener* _tmp2_ = NULL;
	BoscoECSComponentReplacedListener* _tmp3_ = NULL;
	g_return_if_fail (self != NULL);
	_tmp0_ = self->priv->_listeners;
	_tmp1_ = event;
	_tmp1__target = event_target;
	_tmp2_ = bosco_ecs_component_replaced_listener_new (_tmp1_, _tmp1__target);
	_tmp3_ = _tmp2_;
	gee_abstract_collection_add ((GeeAbstractCollection*) _tmp0_, _tmp3_);
	_bosco_ecs_component_replaced_listener_unref0 (_tmp3_);
}


static gpointer _g_object_ref0 (gpointer self) {
	return self ? g_object_ref (self) : NULL;
}


void bosco_ecs_component_replaced_remove (BoscoECSComponentReplaced* self, BoscoECSOnComponentReplaced event, void* event_target) {
	g_return_if_fail (self != NULL);
	{
		GeeArrayList* _listener_list = NULL;
		GeeArrayList* _tmp0_ = NULL;
		GeeArrayList* _tmp1_ = NULL;
		gint _listener_size = 0;
		GeeArrayList* _tmp2_ = NULL;
		gint _tmp3_ = 0;
		gint _tmp4_ = 0;
		gint _listener_index = 0;
		_tmp0_ = self->priv->_listeners;
		_tmp1_ = _g_object_ref0 (_tmp0_);
		_listener_list = _tmp1_;
		_tmp2_ = _listener_list;
		_tmp3_ = gee_abstract_collection_get_size ((GeeCollection*) _tmp2_);
		_tmp4_ = _tmp3_;
		_listener_size = _tmp4_;
		_listener_index = -1;
		while (TRUE) {
			gint _tmp5_ = 0;
			gint _tmp6_ = 0;
			gint _tmp7_ = 0;
			BoscoECSComponentReplacedListener* listener = NULL;
			GeeArrayList* _tmp8_ = NULL;
			gint _tmp9_ = 0;
			gpointer _tmp10_ = NULL;
			BoscoECSComponentReplacedListener* _tmp11_ = NULL;
			BoscoECSOnComponentReplaced _tmp12_ = NULL;
			void* _tmp12__target = NULL;
			BoscoECSOnComponentReplaced _tmp13_ = NULL;
			void* _tmp13__target = NULL;
			BoscoECSOnComponentReplaced _tmp14_ = NULL;
			void* _tmp14__target = NULL;
			_tmp5_ = _listener_index;
			_listener_index = _tmp5_ + 1;
			_tmp6_ = _listener_index;
			_tmp7_ = _listener_size;
			if (!(_tmp6_ < _tmp7_)) {
				break;
			}
			_tmp8_ = _listener_list;
			_tmp9_ = _listener_index;
			_tmp10_ = gee_abstract_list_get ((GeeAbstractList*) _tmp8_, _tmp9_);
			listener = (BoscoECSComponentReplacedListener*) _tmp10_;
			_tmp11_ = listener;
			_tmp12_ = bosco_ecs_component_replaced_listener_get_event (_tmp11_, &_tmp12__target);
			_tmp13_ = _tmp12_;
			_tmp13__target = _tmp12__target;
			_tmp14_ = event;
			_tmp14__target = event_target;
			if (_tmp13_ == _tmp14_) {
				GeeArrayList* _tmp15_ = NULL;
				BoscoECSComponentReplacedListener* _tmp16_ = NULL;
				_tmp15_ = self->priv->_listeners;
				_tmp16_ = listener;
				gee_abstract_collection_remove ((GeeAbstractCollection*) _tmp15_, _tmp16_);
				_bosco_ecs_component_replaced_listener_unref0 (listener);
				_g_object_unref0 (_listener_list);
				return;
			}
			_bosco_ecs_component_replaced_listener_unref0 (listener);
		}
		_g_object_unref0 (_listener_list);
	}
}


void bosco_ecs_component_replaced_clear (BoscoECSComponentReplaced* self) {
	GeeArrayList* _tmp0_ = NULL;
	g_return_if_fail (self != NULL);
	_tmp0_ = gee_array_list_new (BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER, (GBoxedCopyFunc) bosco_ecs_component_replaced_listener_ref, bosco_ecs_component_replaced_listener_unref, NULL, NULL, NULL);
	_g_object_unref0 (self->priv->_listeners);
	self->priv->_listeners = _tmp0_;
}


void bosco_ecs_component_replaced_dispatch (BoscoECSComponentReplaced* self, BoscoECSEntity* e, gint index, BoscoECSIComponent* component, BoscoECSIComponent* replacement) {
	g_return_if_fail (self != NULL);
	g_return_if_fail (e != NULL);
	g_return_if_fail (component != NULL);
	g_return_if_fail (replacement != NULL);
	{
		GeeArrayList* _listener_list = NULL;
		GeeArrayList* _tmp0_ = NULL;
		GeeArrayList* _tmp1_ = NULL;
		gint _listener_size = 0;
		GeeArrayList* _tmp2_ = NULL;
		gint _tmp3_ = 0;
		gint _tmp4_ = 0;
		gint _listener_index = 0;
		_tmp0_ = self->priv->_listeners;
		_tmp1_ = _g_object_ref0 (_tmp0_);
		_listener_list = _tmp1_;
		_tmp2_ = _listener_list;
		_tmp3_ = gee_abstract_collection_get_size ((GeeCollection*) _tmp2_);
		_tmp4_ = _tmp3_;
		_listener_size = _tmp4_;
		_listener_index = -1;
		while (TRUE) {
			gint _tmp5_ = 0;
			gint _tmp6_ = 0;
			gint _tmp7_ = 0;
			BoscoECSComponentReplacedListener* listener = NULL;
			GeeArrayList* _tmp8_ = NULL;
			gint _tmp9_ = 0;
			gpointer _tmp10_ = NULL;
			BoscoECSComponentReplacedListener* _tmp11_ = NULL;
			BoscoECSOnComponentReplaced _tmp12_ = NULL;
			void* _tmp12__target = NULL;
			BoscoECSOnComponentReplaced _tmp13_ = NULL;
			void* _tmp13__target = NULL;
			BoscoECSEntity* _tmp14_ = NULL;
			gint _tmp15_ = 0;
			BoscoECSIComponent* _tmp16_ = NULL;
			BoscoECSIComponent* _tmp17_ = NULL;
			_tmp5_ = _listener_index;
			_listener_index = _tmp5_ + 1;
			_tmp6_ = _listener_index;
			_tmp7_ = _listener_size;
			if (!(_tmp6_ < _tmp7_)) {
				break;
			}
			_tmp8_ = _listener_list;
			_tmp9_ = _listener_index;
			_tmp10_ = gee_abstract_list_get ((GeeAbstractList*) _tmp8_, _tmp9_);
			listener = (BoscoECSComponentReplacedListener*) _tmp10_;
			_tmp11_ = listener;
			_tmp12_ = bosco_ecs_component_replaced_listener_get_event (_tmp11_, &_tmp12__target);
			_tmp13_ = _tmp12_;
			_tmp13__target = _tmp12__target;
			_tmp14_ = e;
			_tmp15_ = index;
			_tmp16_ = component;
			_tmp17_ = replacement;
			_tmp13_ (_tmp14_, _tmp15_, _tmp16_, _tmp17_, _tmp13__target);
			_bosco_ecs_component_replaced_listener_unref0 (listener);
		}
		_g_object_unref0 (_listener_list);
	}
}


BoscoECSComponentReplaced* bosco_ecs_component_replaced_construct (GType object_type) {
	BoscoECSComponentReplaced* self = NULL;
	self = (BoscoECSComponentReplaced*) g_type_create_instance (object_type);
	return self;
}


BoscoECSComponentReplaced* bosco_ecs_component_replaced_new (void) {
	return bosco_ecs_component_replaced_construct (BOSCO_ECS_TYPE_COMPONENT_REPLACED);
}


BoscoECSComponentReplacedListener* bosco_ecs_component_replaced_listener_construct (GType object_type, BoscoECSOnComponentReplaced event, void* event_target) {
	BoscoECSComponentReplacedListener* self = NULL;
	BoscoECSOnComponentReplaced _tmp0_ = NULL;
	void* _tmp0__target = NULL;
	self = (BoscoECSComponentReplacedListener*) g_type_create_instance (object_type);
	_tmp0_ = event;
	_tmp0__target = event_target;
	self->priv->_event = _tmp0_;
	self->priv->_event_target = _tmp0__target;
	return self;
}


BoscoECSComponentReplacedListener* bosco_ecs_component_replaced_listener_new (BoscoECSOnComponentReplaced event, void* event_target) {
	return bosco_ecs_component_replaced_listener_construct (BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER, event, event_target);
}


BoscoECSOnComponentReplaced bosco_ecs_component_replaced_listener_get_event (BoscoECSComponentReplacedListener* self, gpointer* result_target) {
	BoscoECSOnComponentReplaced result;
	BoscoECSOnComponentReplaced _tmp0_ = NULL;
	void* _tmp0__target = NULL;
	BoscoECSOnComponentReplaced _tmp1_ = NULL;
	void* _tmp1__target = NULL;
	g_return_val_if_fail (self != NULL, NULL);
	_tmp0_ = self->priv->_event;
	_tmp0__target = self->priv->_event_target;
	_tmp1_ = _tmp0_;
	_tmp1__target = _tmp0__target;
	*result_target = _tmp1__target;
	result = _tmp1_;
	return result;
}


void bosco_ecs_component_replaced_listener_set_event (BoscoECSComponentReplacedListener* self, BoscoECSOnComponentReplaced value, gpointer value_target) {
	BoscoECSOnComponentReplaced _tmp0_ = NULL;
	void* _tmp0__target = NULL;
	g_return_if_fail (self != NULL);
	_tmp0_ = value;
	_tmp0__target = value_target;
	self->priv->_event = _tmp0_;
	self->priv->_event_target = _tmp0__target;
}


static void bosco_ecs_component_replaced_value_listener_init (GValue* value) {
	value->data[0].v_pointer = NULL;
}


static void bosco_ecs_component_replaced_value_listener_free_value (GValue* value) {
	if (value->data[0].v_pointer) {
		bosco_ecs_component_replaced_listener_unref (value->data[0].v_pointer);
	}
}


static void bosco_ecs_component_replaced_value_listener_copy_value (const GValue* src_value, GValue* dest_value) {
	if (src_value->data[0].v_pointer) {
		dest_value->data[0].v_pointer = bosco_ecs_component_replaced_listener_ref (src_value->data[0].v_pointer);
	} else {
		dest_value->data[0].v_pointer = NULL;
	}
}


static gpointer bosco_ecs_component_replaced_value_listener_peek_pointer (const GValue* value) {
	return value->data[0].v_pointer;
}


static gchar* bosco_ecs_component_replaced_value_listener_collect_value (GValue* value, guint n_collect_values, GTypeCValue* collect_values, guint collect_flags) {
	if (collect_values[0].v_pointer) {
		BoscoECSComponentReplacedListener* object;
		object = collect_values[0].v_pointer;
		if (object->parent_instance.g_class == NULL) {
			return g_strconcat ("invalid unclassed object pointer for value type `", G_VALUE_TYPE_NAME (value), "'", NULL);
		} else if (!g_value_type_compatible (G_TYPE_FROM_INSTANCE (object), G_VALUE_TYPE (value))) {
			return g_strconcat ("invalid object type `", g_type_name (G_TYPE_FROM_INSTANCE (object)), "' for value type `", G_VALUE_TYPE_NAME (value), "'", NULL);
		}
		value->data[0].v_pointer = bosco_ecs_component_replaced_listener_ref (object);
	} else {
		value->data[0].v_pointer = NULL;
	}
	return NULL;
}


static gchar* bosco_ecs_component_replaced_value_listener_lcopy_value (const GValue* value, guint n_collect_values, GTypeCValue* collect_values, guint collect_flags) {
	BoscoECSComponentReplacedListener** object_p;
	object_p = collect_values[0].v_pointer;
	if (!object_p) {
		return g_strdup_printf ("value location for `%s' passed as NULL", G_VALUE_TYPE_NAME (value));
	}
	if (!value->data[0].v_pointer) {
		*object_p = NULL;
	} else if (collect_flags & G_VALUE_NOCOPY_CONTENTS) {
		*object_p = value->data[0].v_pointer;
	} else {
		*object_p = bosco_ecs_component_replaced_listener_ref (value->data[0].v_pointer);
	}
	return NULL;
}


GParamSpec* bosco_ecs_component_replaced_param_spec_listener (const gchar* name, const gchar* nick, const gchar* blurb, GType object_type, GParamFlags flags) {
	BoscoECSComponentReplacedParamSpecListener* spec;
	g_return_val_if_fail (g_type_is_a (object_type, BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER), NULL);
	spec = g_param_spec_internal (G_TYPE_PARAM_OBJECT, name, nick, blurb, flags);
	G_PARAM_SPEC (spec)->value_type = object_type;
	return G_PARAM_SPEC (spec);
}


gpointer bosco_ecs_component_replaced_value_get_listener (const GValue* value) {
	g_return_val_if_fail (G_TYPE_CHECK_VALUE_TYPE (value, BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER), NULL);
	return value->data[0].v_pointer;
}


void bosco_ecs_component_replaced_value_set_listener (GValue* value, gpointer v_object) {
	BoscoECSComponentReplacedListener* old;
	g_return_if_fail (G_TYPE_CHECK_VALUE_TYPE (value, BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER));
	old = value->data[0].v_pointer;
	if (v_object) {
		g_return_if_fail (G_TYPE_CHECK_INSTANCE_TYPE (v_object, BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER));
		g_return_if_fail (g_value_type_compatible (G_TYPE_FROM_INSTANCE (v_object), G_VALUE_TYPE (value)));
		value->data[0].v_pointer = v_object;
		bosco_ecs_component_replaced_listener_ref (value->data[0].v_pointer);
	} else {
		value->data[0].v_pointer = NULL;
	}
	if (old) {
		bosco_ecs_component_replaced_listener_unref (old);
	}
}


void bosco_ecs_component_replaced_value_take_listener (GValue* value, gpointer v_object) {
	BoscoECSComponentReplacedListener* old;
	g_return_if_fail (G_TYPE_CHECK_VALUE_TYPE (value, BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER));
	old = value->data[0].v_pointer;
	if (v_object) {
		g_return_if_fail (G_TYPE_CHECK_INSTANCE_TYPE (v_object, BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER));
		g_return_if_fail (g_value_type_compatible (G_TYPE_FROM_INSTANCE (v_object), G_VALUE_TYPE (value)));
		value->data[0].v_pointer = v_object;
	} else {
		value->data[0].v_pointer = NULL;
	}
	if (old) {
		bosco_ecs_component_replaced_listener_unref (old);
	}
}


static void bosco_ecs_component_replaced_listener_class_init (BoscoECSComponentReplacedListenerClass * klass) {
	bosco_ecs_component_replaced_listener_parent_class = g_type_class_peek_parent (klass);
	((BoscoECSComponentReplacedListenerClass *) klass)->finalize = bosco_ecs_component_replaced_listener_finalize;
	g_type_class_add_private (klass, sizeof (BoscoECSComponentReplacedListenerPrivate));
}


static void bosco_ecs_component_replaced_listener_instance_init (BoscoECSComponentReplacedListener * self) {
	self->priv = BOSCO_ECS_COMPONENT_REPLACED_LISTENER_GET_PRIVATE (self);
	self->ref_count = 1;
}


static void bosco_ecs_component_replaced_listener_finalize (BoscoECSComponentReplacedListener* obj) {
	BoscoECSComponentReplacedListener * self;
	self = G_TYPE_CHECK_INSTANCE_CAST (obj, BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER, BoscoECSComponentReplacedListener);
	g_signal_handlers_destroy (self);
}


GType bosco_ecs_component_replaced_listener_get_type (void) {
	static volatile gsize bosco_ecs_component_replaced_listener_type_id__volatile = 0;
	if (g_once_init_enter (&bosco_ecs_component_replaced_listener_type_id__volatile)) {
		static const GTypeValueTable g_define_type_value_table = { bosco_ecs_component_replaced_value_listener_init, bosco_ecs_component_replaced_value_listener_free_value, bosco_ecs_component_replaced_value_listener_copy_value, bosco_ecs_component_replaced_value_listener_peek_pointer, "p", bosco_ecs_component_replaced_value_listener_collect_value, "p", bosco_ecs_component_replaced_value_listener_lcopy_value };
		static const GTypeInfo g_define_type_info = { sizeof (BoscoECSComponentReplacedListenerClass), (GBaseInitFunc) NULL, (GBaseFinalizeFunc) NULL, (GClassInitFunc) bosco_ecs_component_replaced_listener_class_init, (GClassFinalizeFunc) NULL, NULL, sizeof (BoscoECSComponentReplacedListener), 0, (GInstanceInitFunc) bosco_ecs_component_replaced_listener_instance_init, &g_define_type_value_table };
		static const GTypeFundamentalInfo g_define_type_fundamental_info = { (G_TYPE_FLAG_CLASSED | G_TYPE_FLAG_INSTANTIATABLE | G_TYPE_FLAG_DERIVABLE | G_TYPE_FLAG_DEEP_DERIVABLE) };
		GType bosco_ecs_component_replaced_listener_type_id;
		bosco_ecs_component_replaced_listener_type_id = g_type_register_fundamental (g_type_fundamental_next (), "BoscoECSComponentReplacedListener", &g_define_type_info, &g_define_type_fundamental_info, 0);
		g_once_init_leave (&bosco_ecs_component_replaced_listener_type_id__volatile, bosco_ecs_component_replaced_listener_type_id);
	}
	return bosco_ecs_component_replaced_listener_type_id__volatile;
}


gpointer bosco_ecs_component_replaced_listener_ref (gpointer instance) {
	BoscoECSComponentReplacedListener* self;
	self = instance;
	g_atomic_int_inc (&self->ref_count);
	return instance;
}


void bosco_ecs_component_replaced_listener_unref (gpointer instance) {
	BoscoECSComponentReplacedListener* self;
	self = instance;
	if (g_atomic_int_dec_and_test (&self->ref_count)) {
		BOSCO_ECS_COMPONENT_REPLACED_LISTENER_GET_CLASS (self)->finalize (self);
		g_type_free_instance ((GTypeInstance *) self);
	}
}


static void bosco_ecs_value_component_replaced_init (GValue* value) {
	value->data[0].v_pointer = NULL;
}


static void bosco_ecs_value_component_replaced_free_value (GValue* value) {
	if (value->data[0].v_pointer) {
		bosco_ecs_component_replaced_unref (value->data[0].v_pointer);
	}
}


static void bosco_ecs_value_component_replaced_copy_value (const GValue* src_value, GValue* dest_value) {
	if (src_value->data[0].v_pointer) {
		dest_value->data[0].v_pointer = bosco_ecs_component_replaced_ref (src_value->data[0].v_pointer);
	} else {
		dest_value->data[0].v_pointer = NULL;
	}
}


static gpointer bosco_ecs_value_component_replaced_peek_pointer (const GValue* value) {
	return value->data[0].v_pointer;
}


static gchar* bosco_ecs_value_component_replaced_collect_value (GValue* value, guint n_collect_values, GTypeCValue* collect_values, guint collect_flags) {
	if (collect_values[0].v_pointer) {
		BoscoECSComponentReplaced* object;
		object = collect_values[0].v_pointer;
		if (object->parent_instance.g_class == NULL) {
			return g_strconcat ("invalid unclassed object pointer for value type `", G_VALUE_TYPE_NAME (value), "'", NULL);
		} else if (!g_value_type_compatible (G_TYPE_FROM_INSTANCE (object), G_VALUE_TYPE (value))) {
			return g_strconcat ("invalid object type `", g_type_name (G_TYPE_FROM_INSTANCE (object)), "' for value type `", G_VALUE_TYPE_NAME (value), "'", NULL);
		}
		value->data[0].v_pointer = bosco_ecs_component_replaced_ref (object);
	} else {
		value->data[0].v_pointer = NULL;
	}
	return NULL;
}


static gchar* bosco_ecs_value_component_replaced_lcopy_value (const GValue* value, guint n_collect_values, GTypeCValue* collect_values, guint collect_flags) {
	BoscoECSComponentReplaced** object_p;
	object_p = collect_values[0].v_pointer;
	if (!object_p) {
		return g_strdup_printf ("value location for `%s' passed as NULL", G_VALUE_TYPE_NAME (value));
	}
	if (!value->data[0].v_pointer) {
		*object_p = NULL;
	} else if (collect_flags & G_VALUE_NOCOPY_CONTENTS) {
		*object_p = value->data[0].v_pointer;
	} else {
		*object_p = bosco_ecs_component_replaced_ref (value->data[0].v_pointer);
	}
	return NULL;
}


GParamSpec* bosco_ecs_param_spec_component_replaced (const gchar* name, const gchar* nick, const gchar* blurb, GType object_type, GParamFlags flags) {
	BoscoECSParamSpecComponentReplaced* spec;
	g_return_val_if_fail (g_type_is_a (object_type, BOSCO_ECS_TYPE_COMPONENT_REPLACED), NULL);
	spec = g_param_spec_internal (G_TYPE_PARAM_OBJECT, name, nick, blurb, flags);
	G_PARAM_SPEC (spec)->value_type = object_type;
	return G_PARAM_SPEC (spec);
}


gpointer bosco_ecs_value_get_component_replaced (const GValue* value) {
	g_return_val_if_fail (G_TYPE_CHECK_VALUE_TYPE (value, BOSCO_ECS_TYPE_COMPONENT_REPLACED), NULL);
	return value->data[0].v_pointer;
}


void bosco_ecs_value_set_component_replaced (GValue* value, gpointer v_object) {
	BoscoECSComponentReplaced* old;
	g_return_if_fail (G_TYPE_CHECK_VALUE_TYPE (value, BOSCO_ECS_TYPE_COMPONENT_REPLACED));
	old = value->data[0].v_pointer;
	if (v_object) {
		g_return_if_fail (G_TYPE_CHECK_INSTANCE_TYPE (v_object, BOSCO_ECS_TYPE_COMPONENT_REPLACED));
		g_return_if_fail (g_value_type_compatible (G_TYPE_FROM_INSTANCE (v_object), G_VALUE_TYPE (value)));
		value->data[0].v_pointer = v_object;
		bosco_ecs_component_replaced_ref (value->data[0].v_pointer);
	} else {
		value->data[0].v_pointer = NULL;
	}
	if (old) {
		bosco_ecs_component_replaced_unref (old);
	}
}


void bosco_ecs_value_take_component_replaced (GValue* value, gpointer v_object) {
	BoscoECSComponentReplaced* old;
	g_return_if_fail (G_TYPE_CHECK_VALUE_TYPE (value, BOSCO_ECS_TYPE_COMPONENT_REPLACED));
	old = value->data[0].v_pointer;
	if (v_object) {
		g_return_if_fail (G_TYPE_CHECK_INSTANCE_TYPE (v_object, BOSCO_ECS_TYPE_COMPONENT_REPLACED));
		g_return_if_fail (g_value_type_compatible (G_TYPE_FROM_INSTANCE (v_object), G_VALUE_TYPE (value)));
		value->data[0].v_pointer = v_object;
	} else {
		value->data[0].v_pointer = NULL;
	}
	if (old) {
		bosco_ecs_component_replaced_unref (old);
	}
}


static void bosco_ecs_component_replaced_class_init (BoscoECSComponentReplacedClass * klass) {
	bosco_ecs_component_replaced_parent_class = g_type_class_peek_parent (klass);
	((BoscoECSComponentReplacedClass *) klass)->finalize = bosco_ecs_component_replaced_finalize;
	g_type_class_add_private (klass, sizeof (BoscoECSComponentReplacedPrivate));
}


static void bosco_ecs_component_replaced_instance_init (BoscoECSComponentReplaced * self) {
	GeeArrayList* _tmp0_ = NULL;
	self->priv = BOSCO_ECS_COMPONENT_REPLACED_GET_PRIVATE (self);
	_tmp0_ = gee_array_list_new (BOSCO_ECS_COMPONENT_REPLACED_TYPE_LISTENER, (GBoxedCopyFunc) bosco_ecs_component_replaced_listener_ref, bosco_ecs_component_replaced_listener_unref, NULL, NULL, NULL);
	self->priv->_listeners = _tmp0_;
	self->ref_count = 1;
}


static void bosco_ecs_component_replaced_finalize (BoscoECSComponentReplaced* obj) {
	BoscoECSComponentReplaced * self;
	self = G_TYPE_CHECK_INSTANCE_CAST (obj, BOSCO_ECS_TYPE_COMPONENT_REPLACED, BoscoECSComponentReplaced);
	g_signal_handlers_destroy (self);
	_g_object_unref0 (self->priv->_listeners);
}


GType bosco_ecs_component_replaced_get_type (void) {
	static volatile gsize bosco_ecs_component_replaced_type_id__volatile = 0;
	if (g_once_init_enter (&bosco_ecs_component_replaced_type_id__volatile)) {
		static const GTypeValueTable g_define_type_value_table = { bosco_ecs_value_component_replaced_init, bosco_ecs_value_component_replaced_free_value, bosco_ecs_value_component_replaced_copy_value, bosco_ecs_value_component_replaced_peek_pointer, "p", bosco_ecs_value_component_replaced_collect_value, "p", bosco_ecs_value_component_replaced_lcopy_value };
		static const GTypeInfo g_define_type_info = { sizeof (BoscoECSComponentReplacedClass), (GBaseInitFunc) NULL, (GBaseFinalizeFunc) NULL, (GClassInitFunc) bosco_ecs_component_replaced_class_init, (GClassFinalizeFunc) NULL, NULL, sizeof (BoscoECSComponentReplaced), 0, (GInstanceInitFunc) bosco_ecs_component_replaced_instance_init, &g_define_type_value_table };
		static const GTypeFundamentalInfo g_define_type_fundamental_info = { (G_TYPE_FLAG_CLASSED | G_TYPE_FLAG_INSTANTIATABLE | G_TYPE_FLAG_DERIVABLE | G_TYPE_FLAG_DEEP_DERIVABLE) };
		GType bosco_ecs_component_replaced_type_id;
		bosco_ecs_component_replaced_type_id = g_type_register_fundamental (g_type_fundamental_next (), "BoscoECSComponentReplaced", &g_define_type_info, &g_define_type_fundamental_info, 0);
		g_once_init_leave (&bosco_ecs_component_replaced_type_id__volatile, bosco_ecs_component_replaced_type_id);
	}
	return bosco_ecs_component_replaced_type_id__volatile;
}


gpointer bosco_ecs_component_replaced_ref (gpointer instance) {
	BoscoECSComponentReplaced* self;
	self = instance;
	g_atomic_int_inc (&self->ref_count);
	return instance;
}


void bosco_ecs_component_replaced_unref (gpointer instance) {
	BoscoECSComponentReplaced* self;
	self = instance;
	if (g_atomic_int_dec_and_test (&self->ref_count)) {
		BOSCO_ECS_COMPONENT_REPLACED_GET_CLASS (self)->finalize (self);
		g_type_free_instance ((GTypeInstance *) self);
	}
}



