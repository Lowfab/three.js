/**
 * @author szimek / https://github.com/szimek/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.WebGLRenderTarget = function ( width, height, options ) {

	this.width = width;
	this.height = height;

	options = options || {};

	this.texture = options.texture;
	if (!this.texture) {

		this.texture = {

			wrapS: options.wrapS !== undefined ? options.wrapS : THREE.ClampToEdgeWrapping,
			wrapT: options.wrapT !== undefined ? options.wrapT : THREE.ClampToEdgeWrapping,
			magFilter: options.magFilter !== undefined ? options.magFilter : THREE.LinearFilter,
			minFilter: options.minFilter !== undefined ? options.minFilter : THREE.LinearMipMapLinearFilter,
			anisotropy: options.anisotropy !== undefined ? options.anisotropy : 1,
			offset: new THREE.Vector2( 0, 0 ),
			repeat: new THREE.Vector2( 1, 1 ),
			format: options.format !== undefined ? options.format : THREE.RGBAFormat,
			type: options.type !== undefined ? options.type : THREE.UnsignedByteType,

			clone: function () {

				var tmp = {};
				tmp.wrapS = this.wrapS;
				tmp.wrapT = this.wrapT;
				
				tmp.magFilter = this.magFilter;
				tmp.minFilter = this.minFilter;
				
				tmp.anisotropy = this.anisotropy;
				
				tmp.format = this.format;
				tmp.type = this.type;
				
				tmp.offset = this.offset.clone();
				tmp.repeat = this.repeat.clone();
				
				return tmp;
				
			}

		};

	}

	this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
	this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;
	this.depthTexture = options.depthTexture;

	this.generateMipmaps = true;

	this.shareDepthFrom = options.shareDepthFrom !== undefined ? options.shareDepthFrom : null;

};

THREE.WebGLRenderTarget.prototype = {

	constructor: THREE.WebGLRenderTarget,

	setSize: function ( width, height ) {

		this.width = width;
		this.height = height;

	},

	clone: function () {

		var tmp = new THREE.WebGLRenderTarget( this.width, this.height );

		tmp.texture = this.texture.clone();
		if (this.depthTexture) tmp.depthTexture = this.depthTexture.clone();

		tmp.depthBuffer = this.depthBuffer;
		tmp.stencilBuffer = this.stencilBuffer;

		tmp.generateMipmaps = this.generateMipmaps;

		tmp.shareDepthFrom = this.shareDepthFrom;

		return tmp;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

THREE.EventDispatcher.prototype.apply( THREE.WebGLRenderTarget.prototype );
