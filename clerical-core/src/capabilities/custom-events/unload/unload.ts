{
    const originalRemoveChild = Node.prototype.removeChild;
    (Node as any).prototype.removeChild = function(child: any) {
        const result = originalRemoveChild.apply(this, arguments as any);
        if (!child.unloaded) {
            child.dispatchEvent(new Event('unload'));
            child.unloaded = true;
        }
        return result;
    };
}
{
    const originalRemove = Element.prototype.remove;
    (Element as any).prototype.remove = function() {
        const result = originalRemove.apply(this, arguments as any);
        if (!this.unloaded) {
            this.dispatchEvent(new Event('unload'));
            this.unloaded = true;
        }
        return result;
    };
}
